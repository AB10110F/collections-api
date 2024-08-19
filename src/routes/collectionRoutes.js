const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/collections', authenticate, collectionController.createCollection);
router.get('/collections', authenticate, collectionController.getCollections);
router.get('/collections/:id', authenticate, collectionController.getCollectionById);
router.put('/collections/:id', authenticate, collectionController.updateCollection);
router.delete('/collections/:id', authenticate, collectionController.deleteCollection);

module.exports = router;
