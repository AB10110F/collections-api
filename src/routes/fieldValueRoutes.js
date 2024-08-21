const express = require('express');
const router = express.Router();
const fieldValueController = require('../controllers/fieldValueController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/fieldValues', authenticate, fieldValueController.createField);
router.get('/fieldValues', authenticate, fieldValueController.getFields);
router.get('/fieldValues/:id', authenticate, fieldValueController.getFieldById);
router.put('/fieldValues/:id', authenticate, fieldValueController.updateField);
router.delete('/fieldValues/:id', authenticate, fieldValueController.deleteField);

module.exports = router;
