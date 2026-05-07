const express = require('express');
const router = express.Router();

const {
  validateUpdateProfile,
  validateUpdateAvatar,
  validateId,
} = require("../middlewares/validation");

const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

// 🔒 TODAS estas rutas deberían estar protegidas
router.get('/', getUsers);              // GET /users
router.get('/:userId', validateId, getUserById);   // GET /users/:userId
router.get('/me', getCurrentUser);     // GET /users/me
router.patch('/me', validateUpdateProfile, updateProfile);    // PATCH /users/me
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar); // PATCH /users/me/avatar

module.exports = router;