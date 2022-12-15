const db = require('@database/mysql');

exports.find = async (postId) => {
    const [result] = await db.query(`
        SELECT p.*,u.full_name
        FROM posts p
        JOIN users u ON p.author_id=u.id
        WHERE p.id=?
        LIMIT 1
    `, [postId]);
    return result[0];
}

exports.index = async () => {
    const [posts] = await db.query(`
        SELECT p.*,u.full_name
        FROM posts p
        JOIN users u ON p.author_id=u.id
        ORDER BY p.created_at DESC
    `);
    return posts;
}

exports.store = async (newPost) => {
    const [result] = await db.query('INSERT INTO posts set ?', [newPost]);
    return result.insertId;
}

exports.remove = async (psotId) => {
    const [result] = await db.query('DELETE FROM posts WHERE id=? LIMIT 1', [psotId]);
    return result.affectedRows;
}   

exports.update = async (postId, updatePost) => {
    const [result] = await db.query('UPDATE posts SET ? WHERE id=? LIMIT 1', [updatePost, postId]);
    return result.affectedRows;
}