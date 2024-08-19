const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/fields', authenticate, fieldController.createField);
router.get('/fields', authenticate, fieldController.getFields);
router.get('/fields/:id', authenticate, fieldController.getFieldById);
router.put('/fields/:id', authenticate, fieldController.updateField);
router.delete('/fields/:id', authenticate, fieldController.deleteField);

module.exports = router;
