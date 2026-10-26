import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Host half: a read-only same-origin balance bridge.
 *
 * The client fetches /dsh-eva-unit-01/balance.json from this route. The API key
 * is resolved through the host credentials service and is never logged, cached
 * in a response, or returned to the browser. Only the normalised balance is
 * exposed, behind loopback / same-origin checks.
 */

const ASSET_BASE = '/dsh-eva-unit-01/assets/';
const ASSET_FILES = new Map([
  ['avatar-shinji.png', 'image/png'],
  ['avatar-asuka.png', 'image/png'],
  ['avatar-rei.png', 'image/png'],
  ['portrait-shinji.png', 'image/png'],
  ['portrait-asuka.png', 'image/png'],
  ['portrait-rei.png', 'image/png'],
  ['entry-plug.svg', 'image/svg+xml'],
]);
const ASSET_ROOT = new URL('./assets/', import.meta.url);

const BALANCE_PATH = '/dsh-eva-unit-01/balance.json';
const BALANCE_URL = 'https://api.deepseek.com/user/balance';
const CREDENTIAL_ID = 'DEEPSEEK_API_KEY';
const CACHE_MS = 60_000;
const TIMEOUT_MS = 10_000;

function secretOf(resolved) {
  if (typeof resolved === 'string') return resolved;
  if (resolved && typeof resolved.value === 'string') return resolved.value;
  return '';
}

function amountOf(value) {
  if (typeof value !== 'number' && (typeof value !== 'string' || !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value.trim()))) return null;
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : null;
}

function parseBalance(payload) {
  if (!payload || typeof payload !== 'object') return null;
  const infos = Array.isArray(payload.balance_infos) ? payload.balance_infos : [];
  if (infos.length === 0) return null;
  const wallet = infos.find((item) => item && item.currency === 'CNY') ?? infos[0];
  if (!wallet) return null;
  const balance = amountOf(wallet.total_balance);
  if (balance === null) return null;
  return {
    currency: typeof wallet.currency === 'string' && wallet.currency ? wallet.currency : 'CNY',
    balance,
    granted: amountOf(wallet.granted_balance),
    toppedUp: amountOf(wallet.topped_up_balance),
    available: payload.is_available !== false,
    at: Date.now(),
  };
}

function formatBalance(info) {
  const symbol = info.currency === 'CNY' ? '¥' : info.currency + ' ';
  return symbol + info.balance.toFixed(2);
}

function isTrustedRequest(headers) {
  if (!headers || typeof headers !== 'object') return false;
  const host = String(headers.host ?? '').toLowerCase();
  const authority = host.replace(/:\d+$/, '').replace(/^\[|\]$/g, '');
  if (authority !== '127.0.0.1' && authority !== 'localhost' && authority !== '::1') return false;
  if (String(headers['sec-fetch-site'] ?? '').toLowerCase() === 'cross-site') return false;
  const origin = headers.origin;
  if (origin) {
    try {
      if (new URL(String(origin)).host.toLowerCase() !== host) return false;
    } catch {
      return false;
    }
  }
  return true;
}

export function apply(ctx) {
  ctx.inject(['webServer'], (scope) => {
    for (const [file, type] of ASSET_FILES) {
      scope.effect(() => scope.webServer.register({
        kind: 'exact',
        path: ASSET_BASE + file,
        handler: async (req, res) => {
          const send = (status, headers, body) => {
            if (res.destroyed || res.writableEnded) return;
            res.writeHead(status, headers);
            res.end(req.method === 'HEAD' ? undefined : body);
          };
          if (req.method !== 'GET' && req.method !== 'HEAD') {
            return send(405, { 'content-type': 'text/plain' }, 'method not allowed');
          }
          try {
            const body = await readFile(new URL(file, ASSET_ROOT));
            send(200, {
              'content-type': type,
              'content-length': body.length,
              'cache-control': 'public, max-age=3600',
              'x-content-type-options': 'nosniff',
            }, body);
          } catch {
            send(404, { 'content-type': 'text/plain' }, 'not found');
          }
        },
      }), 'eva-unit-01: asset ' + file);
    }
  });

  ctx.inject(['webServer', 'credentials'], (scope) => {
    let cache = null;
    let inflight = null;

    const readBalance = async (force) => {
      if (!force && cache && Date.now() - cache.at < CACHE_MS) return cache.body;
      if (inflight) return inflight;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      const task = (async () => {
        try {
          const key = secretOf(await scope.credentials.resolve(CREDENTIAL_ID));
          if (!key) return { ok: false, code: 'NO_KEY' };
          const response = await fetch(BALANCE_URL, {
            signal: controller.signal,
            headers: { authorization: 'Bearer ' + key, accept: 'application/json' },
          });
          if (!response.ok) return { ok: false, code: 'HTTP_' + response.status };
          const info = parseBalance(await response.json());
          if (!info) return { ok: false, code: 'NO_BALANCE' };
          return { ok: true, ...info, text: formatBalance(info) };
        } catch (error) {
          return { ok: false, code: controller.signal.aborted ? 'TIMEOUT' : 'ERROR' };
        } finally {
          clearTimeout(timer);
        }
      })();
      inflight = task;
      try {
        const body = await task;
        if (body.ok) cache = { at: Date.now(), body };
        return body;
      } finally {
        if (inflight === task) inflight = null;
      }
    };

    scope.effect(() => scope.webServer.register({
      kind: 'exact',
      path: BALANCE_PATH,
      handler: async (req, res) => {
        const send = (status, body) => {
          if (res.destroyed || res.writableEnded) return;
          res.writeHead(status, {
            'content-type': 'application/json; charset=utf-8',
            'cache-control': 'no-store',
          });
          res.end(req.method === 'HEAD' ? undefined : JSON.stringify(body));
        };
        if (!isTrustedRequest(req.headers)) return send(403, { ok: false, code: 'FORBIDDEN' });
        if (req.method !== 'GET' && req.method !== 'HEAD') return send(405, { ok: false, code: 'METHOD' });
        const refresh = new URL(req.url || BALANCE_PATH, 'http://localhost').searchParams.get('refresh') === '1';
        try {
          send(200, await readBalance(refresh));
        } catch {
          send(500, { ok: false, code: 'ERROR' });
        }
      },
    }), 'eva-unit-01: balance route');
  });
}
