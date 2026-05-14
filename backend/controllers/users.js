const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_SECRET = 'dev-secret' } = process.env;

// GET /users — obtener todos los usuarios
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET /users/:userId — obtener usuario por ID
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      next(err);
    });
};

// POST /users — crear usuario
const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    return res.status(201).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.statusCode = 400;
    }

    return next(err);
  }
};

// GET /users/me — obtener usuario actual
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      next(err);
    });
};

// POST /signin — login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send({ message: "Email o contraseña incorrectos" });
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return res
        .status(401)
        .send({ message: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

// PATCH /users/me — actualizar perfil
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }

      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      next(err);
    });
};

// PATCH /users/me/avatar — actualizar avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
      }

      if (err.name === "DocumentNotFoundError") {
        err.statusCode = 404;
      }

      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};