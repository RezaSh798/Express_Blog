const authService = require('@services/authService');
const userRoles = require('@models/user/userRoles');

exports.loginShow = async (req, res) => {
    res.newRender('auth/login', { layout: 'auth' });
}

exports.doLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if(!user) {
        req.flash('errors', ['ایمیل یا کلمه ی عبور معتبر نمی باشد!']);
        return res.redirect('/auth/login');
    }
    req.session.user = user;
    const pathToRedirecct = user.role === userRoles.ADMIN ? '/admin/dashboard' : '/';
    res.redirect(pathToRedirecct);
}
 
exports.registerShow = async (req, res) => {
    res.newRender('auth/register', { layout: 'auth' });
}

exports.doRegister = async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;
    const insertId = await authService.register(email, password);
    if(!insertId) {
        req.flash('errors', ['در حال حاظر امکان ثبت نام شما وجود ندارد!']);
        return res.redirect('/auth/register');
    }
    res.redirect('/auth/login');
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
}