const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const { authenticate, admin } = require('../middleware/auth');

router.post('/comments', authenticate, commentController.createComment);
router.get('/comments', authenticate, commentController.getComments);
router.get('/comments/:id', authenticate, commentController.getCommentById);
router.put('/comments/:id', authenticate, commentController.updateComment);
router.delete('/comments/:id', authenticate, commentController.deleteComment);

module.exports = router;
