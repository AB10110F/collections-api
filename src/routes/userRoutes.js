const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/users', userController.createUser);
router.get('/users', authenticate, userController.getUsers);
router.get('/users/:id', authenticate, userController.getUserById);
router.put('/users', authenticate, userController.updateUser);
router.delete('/users', authenticate, userController.deleteUser);

router.put('/users/sudo/:id', authenticate, admin, userController.updateSudo);

router.post('/login', authController.login);

module.exports = router;
