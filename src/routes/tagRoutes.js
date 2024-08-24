const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/tags', authenticate, tagController.createTag);
router.get('/tags', authenticate, tagController.getTags);
router.get('/tags/:id', authenticate, tagController.getTagById);
router.put('/tags/:id', authenticate, tagController.updateTag);
router.delete('/tags/:id', authenticate, tagController.deleteTag);

module.exports = router;
