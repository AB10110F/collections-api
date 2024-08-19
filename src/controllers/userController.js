const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.createUser = [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email address').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must contain a minimum of 8 letters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Email already registered' });
      }
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = [
  body('name').optional().trim().escape(),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 8 }).withMessage('Password must contain a minimum of 8 letters'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
      user.last_login_time = new Date();
      await user.save();
      const { password: _, ...userData } = user.toJSON();
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.updateSudo = [
  body('status').optional().isIn(['active', 'blocked']).withMessage('Invalid status'),
  body('role').optional().isIn(['admin', 'user']).withMessage('Invalid role'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { id } = req.params;
      const { status, role } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.role = role || user.role;
      user.status = status || user.status;
      await user.save();
      res.status(200).json({ message: 'User updated' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
