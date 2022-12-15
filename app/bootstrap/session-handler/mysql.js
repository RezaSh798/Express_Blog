module.exports = session => {
    const MysqlStore = require('express-mysql-session')(session);
    const mysqlOptions = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    }
    return new MysqlStore(mysqlOptions);
}