import 'dotenv/config';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

const PRODUCT_PRICE_CENTS = 1999;
const SHIPPING_CENTS = 399;
const MAX_QUANTITY = 50;
const MAX_BODY_BYTES = 16 * 1024;

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let size = 0;
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      if (size > MAX_BODY_BYTES) return;
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_BYTES) {
        reject(new Error('Request body is too large.'));
        return;
      }
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function getPublicUrl() {
  const configuredUrl = process.env.APP_URL;
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function getPayseraCredentials() {
  const projectId = process.env.PAYSERA_PROJECT_ID;
  const signPassword = process.env.PAYSERA_SIGN_PASSWORD;
  const publicUrl = getPublicUrl();
  if (!projectId || !signPassword || !publicUrl) return null;

  return { projectId, signPassword, publicUrl };
}

function createSignature(data, password) {
  return createHash('md5').update(data + password, 'utf8').digest('hex');
}

function parseCallbackData(req, rawBody) {
  const params = req.method === 'POST'
    ? new URLSearchParams(rawBody)
    : new URL(req.url, 'http://localhost').searchParams;
  return { data: params.get('data'), signature: params.get('ss1') };
}

async function handleCheckout(req, res) {
  const credentials = getPayseraCredentials();
  if (!credentials) {
    return sendJson(res, 503, { error: 'Paysera checkout is not configured.' });
  }

  let order;
  try {
    order = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { error: 'Invalid checkout request.' });
  }

  if (!order || typeof order !== 'object' || Array.isArray(order)) {
    return sendJson(res, 400, { error: 'Invalid checkout request.' });
  }

  const quantity = Number(order.quantity);
  const firstName = typeof order.firstName === 'string' ? order.firstName.trim() : '';
  const lastName = typeof order.lastName === 'string' ? order.lastName.trim() : '';
  const email = typeof order.email === 'string' ? order.email.trim() : '';
  const phone = typeof order.phone === 'string' ? order.phone.trim() : '';
  const comment = typeof order.comment === 'string' ? order.comment.trim() : '';
  const language = order.language === 'EN' ? 'ENG' : order.language === 'LT' ? 'LIT' : null;

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > MAX_QUANTITY ||
    !firstName ||
    firstName.length > 100 ||
    !lastName ||
    lastName.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    !phone ||
    phone.length > 40 ||
    comment.length > 500 ||
    !language
  ) {
    return sendJson(res, 400, { error: 'Please check the order details and try again.' });
  }

  const amount = quantity * PRODUCT_PRICE_CENTS + SHIPPING_CENTS;
  const orderId = `CAMP-${amount}-${Date.now()}-${randomBytes(4).toString('hex')}`;
  const acceptUrl = new URL('/api/paysera/accept', credentials.publicUrl);
  const cancelUrl = new URL('/api/paysera/cancel', credentials.publicUrl);

  const paymentData = new URLSearchParams({
    projectid: credentials.projectId,
    orderid: orderId,
    accepturl: acceptUrl.toString(),
    cancelurl: cancelUrl.toString(),
    callbackurl: new URL('/api/paysera/callback', credentials.publicUrl).toString(),
    version: '1.6',
    lang: language,
    amount: String(amount),
    currency: 'EUR',
    country: 'LT',
    test: process.env.PAYSERA_TEST === '0' || process.env.PAYSERA_TEST === 'false' ? '0' : '1',
    paytext: `Campfire Pro x${quantity}`,
    p_email: email,
    p_firstname: firstName,
    p_lastname: lastName,
    p_phone: phone,
  });

  console.log(paymentData.toString());
  if (comment) paymentData.set('p_street', comment);

  const encodedData = Buffer.from(paymentData.toString(), 'utf8').toString('base64');
  const signature = createSignature(encodedData, credentials.signPassword);
  const paymentUrl = new URL('https://www.paysera.com/pay/');
  paymentUrl.searchParams.set('data', encodedData);
  paymentUrl.searchParams.set('sign', signature);

  return sendJson(res, 200, { paymentUrl: paymentUrl.toString() });
}

async function handleCallback(req, res) {
  const credentials = getPayseraCredentials();
  if (!credentials) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Paysera callback is not configured.');
  }

  let rawBody = '';
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/x-www-form-urlencoded')) {
      res.writeHead(415);
      return res.end('Unsupported callback content type.');
    }
    try {
      rawBody = await readBody(req);
    } catch {
      res.writeHead(400);
      return res.end('Invalid callback request.');
    }
  }

  const { data, signature } = parseCallbackData(req, rawBody);
  if (!data || !signature || !/^[a-f\d]{32}$/i.test(signature)) {
    res.writeHead(400);
    return res.end('Invalid callback signature.');
  }

  const expectedSignature = createSignature(data, credentials.signPassword);
  const supplied = Buffer.from(signature, 'hex');
  const expected = Buffer.from(expectedSignature, 'hex');
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    res.writeHead(403);
    return res.end('Invalid callback signature.');
  }

  let callback;
  try {
    callback = Object.fromEntries(
      new URLSearchParams(Buffer.from(data, 'base64').toString('utf8'))
    );
  } catch {
    res.writeHead(400);
    return res.end('Invalid callback data.');
  }

  if (
    callback.projectid !== credentials.projectId ||
    !/^CAMP-(\d+)-\d+-[a-f\d]{8}$/i.test(callback.orderid || '') ||
    !/^\d+$/.test(callback.amount || '') ||
    callback.amount !== callback.orderid.split('-')[1] ||
    callback.currency !== 'EUR'
  ) {
    res.writeHead(400);
    return res.end('Invalid callback data.');
  }

  console.info(
    JSON.stringify({
      event: callback.status === '1' ? 'paysera.payment.completed' : 'paysera.payment.status',
      orderId: callback.orderid,
      amount: callback.amount,
      currency: callback.currency,
      status: callback.status,
    })
  );
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  return res.end('OK');
}

export async function payseraApiMiddleware(req, res, next) {
  try {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/accept' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Payment completed.');
    }
    if (pathname === '/cancel' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Payment cancelled.');
    }
    if (pathname === '/checkout' && req.method === 'POST') {
      return await handleCheckout(req, res);
    }
    if (pathname === '/callback' && ['GET', 'POST'].includes(req.method)) {
      return await handleCallback(req, res);
    }
    res.writeHead(404);
    return res.end();
  } catch (error) {
    console.error('Paysera API error:', error);
    if (!res.headersSent) {
      sendJson(res, 500, { error: 'Paysera could not process this request.' });
    } else {
      res.end();
    }
    if (typeof next === 'function' && !res.headersSent) next(error);
  }
}
