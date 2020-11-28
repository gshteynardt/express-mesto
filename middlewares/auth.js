const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/unauthorized-err');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!(authorization || authorization.startsWith('Bearer '))) {
    return res.send(new UnauthorizedErr('необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  const jwtSecret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.send(new UnauthorizedErr('необходима авторизация'));
  }

  req.user = payload;

  next();

  return null;
};
