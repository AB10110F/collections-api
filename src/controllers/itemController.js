const Item = require('../models/Item');
const Collection = require('../models/Collection');
const { body, validationResult } = require('express-validator');

exports.createItem = [
  body('name').trim().escape().notEmpty().withMessage("Name required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const name = req.body
      const { collection_id } = req.params;
      const collection = await Collection.findByPk(collection_id);
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      const newItem = await Item.create({ name, collection_id });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getItems = async (req, res) => {
  try {
    const { collection_id } = req.params;
    const items = await Item.findAll({ where: { collection_id } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const id = req.params;
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = [
  body('name').trim().escape().notEmpty().withMessage('Name required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const id = req.params;
      const { name } = req.body;
      const item = await Item.findByPk(id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      item.name = name || item.name;
      await item.save();
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params;
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    await item.destroy();
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
