const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

module.exports.generateToken = (payload) => jwt.sign(payload,
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' });
