const express = require('express');
const router = express.Router();
const commentController = require('@controllers/admin/comments');

router.get('/', commentController.index);
// router.get('/create', commentController.create);
// router.post('/store', commentController.store);
router.get('/delete/:commentId', commentController.delete);
// router.get('/edit/:postId', commentController.edit);
// router.post('/update/:postId', commentController.update);
router.get('/approved/:commentId', commentController.approved);
router.get('/reject/:commentId', commentController.reject);

module.exports = router;