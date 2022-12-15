const bcrypt = require('bcrypt');

exports.hashPassword = password => {
    return bcrypt.hashSync(password, 10);
}

exports.comparePasswod = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}