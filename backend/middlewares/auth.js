const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "desarrollo-secreto-super-seguro-2024";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(403).send({ message: "Acceso denegado" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Acceso denegado" });
  }

  req.user = payload;
  return next();
};

module.exports = auth;