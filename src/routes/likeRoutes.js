const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/items', authenticate, likeController.createLike);
router.get('/items', authenticate, likeController.countLikes);
router.delete('/items/:id', authenticate, likeController.deleteLike);

module.exports = router;
