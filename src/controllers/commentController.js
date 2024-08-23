const Comment = require('../models/Comment');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

exports.createComment = [
  body('content').trim().escape().notEmpty().withMessage('Content required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      const { user_id, item_id } = req.params;
      const { content } = req.body;
      const newComment = await Comment.create({ content, user_id, item_id });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getComments = async (req, res) => {
  try {
    const id_item = req.params;
    const comments = await Comment.findAll({ where: { id_item } })
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const id = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComment = [
  body('content').trim().escape().notEmpty().withMessage('Content required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params;
      const { content } = req.body;
      const comment = Comment.findByPk(id);
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      comment.content = content || comment.content;
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteComment = async (req, res) => {
  try {
    const id = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Commment not found' });
    }
    await comment.destroy();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
