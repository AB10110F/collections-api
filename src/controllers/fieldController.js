const Field = require('../models/Field');
const Collection = require('../models/Collection');
const { body, validationResult } = require('express-validator');

exports.createField = [
  body('name').trim().escape().notEmpty().withMessage('Name is required'),
  body('field_type').isIn(['Text', 'Number', 'Multiline', 'Checkbox', 'Date']).withMessage('Invalid type'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const collection_id = req.params;
      const { name, field_type } = req.body;
      const collection = await Collection.findByPk(collection_id);
      if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
      }
      const fieldCount = await Field.count({ where: { collection_id, field_type } });
      if (fieldCount >= 3) {
        return res.status(400).json({ message: `Cannot add more than 3 ${field_type} fields` });
      }
      const newField = await Field.create({ name, field_type, collection_id });
      res.status(201).json(newField);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getFields = async (req, res) => {
  try {
    const collection_id = req.params;
    const fields = await Field.findAll({ where: { collection_id } });
    res.status(200).json(fields);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFieldById = async (req, res) => {
  try {
    const { id, collection_id } = req.params;
    const field = await Field.findOne({ where: { id, collection_id } });
    if (!id || !collection_id) {
      return res.status(404).json({ message: 'Field not found' });
    }
    res.status(200).json(field);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateField = [
  body('name').optional().trim().escape().notEmpty().withMessage('Name is required'),
  body('field_type').optional().isIn(['Text', 'Number', 'Multiline', 'Checkbox', 'Date']).withMessage('Invalid type'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id, collection_id } = req.params;
      const { name, field_type } = req.body;
      const field = await Field.findOne({ where: { id, collection_id } })
      if (!field) {
        return res.status(404).json({ message: 'Field not found' });
      }
      field.name = name || field.name;
      field.field_type = field_type || field.field_type;
      await field.save();
      res.status(200).json(field);
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
];

exports.deleteField = async (req, res) => {
  try {
    const id = req.params;
    const field = await Field.findByPk(id)
    if (!field) {
      return res.status(404).json({ message: 'Field not found' });
    }
    await field.destroy();
    res.status(200).json({ message: 'Field deleted' })
  } catch (error) {
    req.status(500).json({ error: error.message });
  }
};
