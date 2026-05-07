const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

// 🔗 validar URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

// ✅ signup
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// ✅ signin
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// ✅ crear tarjeta
const validateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// ✅ actualizar perfil
const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// ✅ actualizar avatar
const validateUpdateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// ✅ validar IDs
const validateId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
    cardId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateCreateCard,
  validateUpdateProfile,
  validateUpdateAvatar,
  validateId,
};