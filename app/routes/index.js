const adminRouter = require('./admin');
const authRouter = require('./auth');
const auth = require('@middlewares/auth');
const admin = require('@middlewares/admin');
const gust = require('@middlewares/gust');
const authController = require('@controllers/auth');

module.exports = app => {
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [gust], authRouter);
    app.use('/logout', authController.logout);
}