const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/items/:id', authenticate, itemController.createItem);
router.get('/items/from/:id', authenticate, itemController.getItems);
router.get('/items/:id', authenticate, itemController.getItemById);
router.put('/items/:id', authenticate, itemController.updateItem);
router.delete('/items/:id', authenticate, itemController.deleteItem);

module.exports = router;
