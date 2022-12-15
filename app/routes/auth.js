const express = require('express');
const router = express.Router();
const authController = require('@controllers/auth');

router.get('/login', authController.loginShow);
router.post('/login', authController.doLogin);
router.get('/register', authController.registerShow);
router.post('/register', authController.doRegister);

module.exports = router;