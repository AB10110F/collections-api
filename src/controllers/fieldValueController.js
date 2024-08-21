const FieldValue = require('../models/FieldValue');
const Field = require('../models/Field');
const Item = require('../models/Item');
const { body, validationResult } = require('express-validator');

exports.createFieldValue = [
  body('value').trim().escape().notEmpty().withMessage('Value is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const value = req.body;
      const { field_id, item_id } = req.params;
      const field = await Field.findByPk(field_id);
      const item = await Item.findByPk(item_id);
      if (!field || !item) {
        return res.status(404).json({ message: 'Data not found' });
      }
      const newFieldValue = await FieldValue.create({ value, field_id, item_id });
      res.status(201).json(newFieldValue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.getFieldValues = async (req, res) => {
  try {
    const { field_id } = req.params
    const fieldValues = await FieldValue.findAll({ where: { field_id } });
    res.status(200).json(fieldValues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFieldValueById = async (req, res) => {
  try {
    const { id, item_id } = req.params;
    const fieldValue = await FieldValue.findOne({ where: { id, item_id } });
    if (!fieldValue) {
      return res.status(404).json({ message: 'Value not found' });
    }
    res.status(200).json(fieldValue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFieldValue = [
  body('value').trim().escape().notEmpty().withMessage('Value is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { value } = req.body;
      const fieldValue = await FieldValue.findByPk(id);
      if (!fieldValue) {
        return res.status(404).json({ message: 'Value not found' });
      }
      fieldValue.value = value || fieldValue.value;
      await fieldValue.save();
      res.status(200).json(fieldValue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.deleteFieldValue = async (req, res) => {
  try {
    const { id } = req.params;
    const fieldValue = await FieldValue.findByPk(id);
    if (!fieldValue) {
      return res.status(404).json({ message: 'Value not found' });
    }
    await fieldValue.destroy();
    res.status(200).json({ message: 'Value deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
