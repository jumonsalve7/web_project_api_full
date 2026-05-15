const jwt = require('jsonwebtoken');

// Usamos la misma clave que pusimos en users.js
const JWT_SECRET = 'desarrollo-secreto-super-seguro-2024';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Acceso denegado: Formato de token incorrecto' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: 'Acceso denegado: Token inválido o clave incorrecta' });
  }

  req.user = payload;
  next();
};

module.exports = auth; 