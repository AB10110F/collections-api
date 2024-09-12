const express = require('express');
const router = express.Router();
const fieldController = require('../controllers/fieldController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/fields/:id', authenticate, fieldController.createField);
router.get('/fields/from/:id', fieldController.getFields);
router.get('/fields/:id', fieldController.getFieldById);
router.put('/fields/:id', authenticate, fieldController.updateField);
router.delete('/fields/:id', authenticate, fieldController.deleteField);

module.exports = router;
