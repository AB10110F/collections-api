const Like = require('../models/Like');
const User = require('../models/Item');
const { body, validationResult } = require('express-validator');

exports.createLike = async (req, res) => {
  try {
    const { user_id, item_id } = req.params;
    await Like.create({ user_id, item_id });
    res.status(201).json({ message: 'Like created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.countLikes = async (req, res) => {
  try {
    const item_id = req.params;
    total = await Like.count({ where: item_id });
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLike = async (req, res) => {
  try {
    const id = req.params;
    const like = await Like.findByPk(id);
    if (!like) {
      return res.status(404).json({ message: 'like not found' });
    }
    await like.destroy();
    res.status(200).json({ message: 'Like deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
