const User = require('@models/user');
const hashService = require('./hashService');
const userRoles = require('@models/user/userRoles');

exports.login = async (email, password) => {
    const user = await User.findByEmail(email);
    if(!user) {
        return false;
    }
    return hashService.comparePasswod(password, user.password) ? user : false;
}
exports.register = async (email, password) => {
    const newUser = {
        full_name: 'کاربر ناشناس',
        email: email,
        password: hashService.hashPassword(password),
        role: userRoles.USER
    }
    const insertId = await User.store(newUser);
    return insertId;
}