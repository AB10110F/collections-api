const express = require('express');
const router = express.Router();
const fieldValueController = require('../controllers/fieldValueController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/fieldValues', authenticate, fieldValueController.createFieldValue);
router.get('/fieldValues', authenticate, fieldValueController.getFieldValues);
router.get('/fieldValues/:id', authenticate, fieldValueController.getFieldValueById);
router.put('/fieldValues/:id', authenticate, fieldValueController.updateFieldValue);
router.delete('/fieldValues/:id', authenticate, fieldValueController.deleteFieldValue);

module.exports = router;
