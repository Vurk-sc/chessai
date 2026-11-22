const crypto = require('crypto');
const { sign } = require('./_token');

const sha = (s) => crypto.createHash('sha256').update(s).digest();

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();

  const expected = process.env.ACCESS_CODE;
  if (!expected || !process.env.TOKEN_SECRET || !process.env.FILE_URL) {
    return res.status(500).json({ error: 'Server is not configured.' });
  }

  const code = String((req.body && req.body.code) || '').trim().slice(0, 200);
  await new Promise((r) => setTimeout(r, 700)); // slows down guessing

  if (!code || !crypto.timingSafeEqual(sha(code), sha(expected))) {
    return res.status(401).json({ error: 'That access code isn’t right.' });
  }
  // Token is good for 5 minutes
  res.status(200).json({ token: sign(Date.now() + 5 * 60 * 1000) });
};
