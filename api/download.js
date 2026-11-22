const { verify } = require('./_token');

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!verify(req.query.token)) {
    return res.status(403).send('This download link has expired. Go back and enter the access code again.');
  }
  // The real file location only ever lives in a server-side env var.
  res.redirect(302, process.env.FILE_URL);
};
