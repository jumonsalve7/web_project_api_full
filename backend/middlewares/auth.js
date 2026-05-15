const jwt = require('jsonwebtoken');

const JWT_SECRET = 'desarrollo-secreto-super-seguro-2024';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Acceso denegado: No hay token' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: 'Acceso denegado: Token inválido' });
  }

  req.user = payload;
  next();
};

module.exports = auth;
