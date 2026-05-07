const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex =
  /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default: "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL no válida",
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo electrónico es obligatorio"],
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Correo electrónico no válido",
    },
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    select: false,
  },
});

module.exports = mongoose.model("User", userSchema);
