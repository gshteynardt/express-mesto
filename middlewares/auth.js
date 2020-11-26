const UnauthorizedErr = require("../errors/unauthorized-err");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'some-secret-key';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if(!(authorization || authorization.startsWith('Bearer '))) {
    return res.send(new UnauthorizedErr('необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
      return res.send(new UnauthorizedErr('необходима авторизация'));
  }

  req.user = payload;

  next();
}