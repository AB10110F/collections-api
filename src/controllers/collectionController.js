const Collection = require('../models/Collection');
const { body, validationResult } = require('express-validator');

exports.createCollection = [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('description').trim().escape().notEmpty().withMessage('Description is required'),
  body('category').isIn(['Fountain Pens', 'Books', 'Coins', 'Keyboards', 'Other']).withMessage('Invalid category'),
  body('image_url').optional().trim().escape().notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, category, image_url } = req.body;
      const newCollection = await Collection.create({ name, description, category, image_url, user_id: req.user.id });
      res.status(201).json(newCollection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({ where: { user_id: req.user.id } });
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findOne({ where: { id, user_id: req.user.id } });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCollection = [
  body('name').optional().trim().escape().notEmpty().withMessage('Name is required'),
  body('description').optional().trim().escape().notEmpty().withMessage('Description is required'),
  body('category').optional().isIn(['Fountain Pens', 'Books', 'Coins', 'Keyboards', 'Other']).withMessage('Invalid category'),
  body('image_url').optional().trim().escape().notEmpty(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name, description, category, image_url } = req.body;
      const collection = await Collection.findOne({ where: { id, user_id: req.user.id } });
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      collection.name = name || collection.name;
      collection.description = description || collection.description;
      collection.category = category || collection.category;
      collection.image_url = image_url || collection.image_url;
      await collection.save();
      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await Collection.findOne({ where: { id, user_id: req.user.id } });
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    await collection.destroy();
    res.status(200).json({ message: 'Collection deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
