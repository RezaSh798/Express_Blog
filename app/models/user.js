const db = require('@database/mysql');

exports.find = async userId => {
    const [result] = await db.query(`SELECT * FROM users WHERE id=? LIMIT 1`, [userId]);
    return result[0];
}

exports.findByEmail = async email => {
    const [result] = await db.query(`
        SELECT * 
        FROM users 
        WHERE email=? 
        LIMIT 1
    `, [email]);
    return result.length === 1 ? result[0] : null;
}

exports.findAll = async (fields = []) => {
    const fieldsNeeded = fields.length > 0 ? fields.join(',') : '*'; 
    const [result] = await db.query(`SELECT ${fieldsNeeded} FROM users`);
    return result;
}

exports.store = async (userData) => {
    const [result] = await db.query('INSERT INTO users set ?', [userData]);
    return result.insertId;
}

exports.remove = async (userId) => {
    const [result] = await db.query('DELETE FROM users WHERE id=? LIMIT 1', [userId]);
    return result.affectedRows;
}   

exports.update = async (userId, updateUser) => {
    const [result] = await db.query('UPDATE users SET ? WHERE id=? LIMIT 1', [updateUser, userId]);
    return result.affectedRows;
}