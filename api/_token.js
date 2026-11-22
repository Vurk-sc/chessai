const crypto = require('crypto');

const mac = (payload) =>
  crypto.createHmac('sha256', process.env.TOKEN_SECRET).update(payload).digest('hex');

// Token = "<expiry ms>.<signature>". Can't be forged without TOKEN_SECRET.
exports.sign = (expiresAt) => {
  const p = String(expiresAt);
  return p + '.' + mac(p);
};

exports.verify = (token) => {
  if (typeof token !== 'string') return false;
  const [p, s] = token.split('.');
  if (!p || !s) return false;
  const a = Buffer.from(mac(p));
  const b = Buffer.from(s);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  return Number(p) > Date.now();
};
