const express = require('express');
const router = express.Router();

// rotes
const dashboardRouter = require('./dashboard');
const postsRouter = require('./post');
const commentsRouter = require('./comment');
const usersRouter = require('./user');

router.use('/dashboard', dashboardRouter);
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/users', usersRouter);

module.exports = router;