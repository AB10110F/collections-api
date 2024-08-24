const Tag = require('../models/Tag');
const Collection = require('../models/Collection');
const { body, validationResult } = require('express-validator');

exports.createTag = [
  body('name').trim().escape().notEmpty().withMessage('Name required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    try {
      const { collection_id } = req.params;
      const name = req.body;
      const tag = await Tag.create({ name, collection_id });
      res.status(201).json(tag);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getTags = async (req, res) => {
  try {
    const collection_id = req.params;
    const tags = Tag.findAll({ where: { collection_id } });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTag = [
  body('name').trim().escape().notEmpty().withMessage('Name required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name } = req.body;
      // const tag = await Tag.update({ name }, { where: { id } });
      const tag = await Tag.findByPk(id);
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' })
      }
      tag.name = name || tag.name;
      await tag.save();
      res.status(200).json(tag);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id);
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    await tag.destroy();
    res.status(200).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
