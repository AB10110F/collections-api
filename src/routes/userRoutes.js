const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/users', authenticate, userController.createUser);
router.get('/users', authenticate, userController.getUsers);
router.get('/users/:id', authenticate, userController.getUserById);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, userController.deleteUser);

router.put('/users/:id', authenticate, admin, userController.updateSudo);

router.post('/login', authController.login);

module.exports = router;
