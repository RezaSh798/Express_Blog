module.exports = app => {
    app.use((req, res, next) => {
        const errors = req.flash('errors');
        const success = req.flash('success');
        const hasError = errors.length > 0;
        let user = null;
        if('user' in req.session) {
            user = req.session.user;
        }
        res.newRender = (template, options) => {
            options = { ...options, hasError, errors, success };
            res.render(template, options);
        }
        res.adminRender = (template, options) => {
            options = { ...options, layout: 'admin', hasError, errors, success, user };
            res.render(template, options);
        }
        next();
    });
}