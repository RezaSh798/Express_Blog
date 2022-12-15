const db = require('@database/mysql');
const commentStatus = require('./commentStatus');

// exports.find = async (postId) => {
//     const [result] = await db.query(`
//         SELECT p.*,u.full_name
//         FROM posts p
//         JOIN users u ON p.author_id=u.id
//         WHERE p.id=?
//         LIMIT 1
//     `, [postId]);
//     return result[0];
// }

exports.index = async () => {
    const [comments] = await db.query(`
        SELECT c.*,p.title
        FROM comments c
        JOIN posts p ON c.post_id=p.id
        ORDER BY p.created_at DESC
    `);
    return comments;
}

// exports.store = async (newPost) => {
//     const [result] = await db.query('INSERT INTO posts set ?', [newPost]);
//     return result.insertId;
// }

exports.delete = async (commentId) => {
    const [result] = await db.query('DELETE FROM comments WHERE id=? LIMIT 1', [commentId]);
    return result.affectedRows;
}   

// exports.update = async (postId, updatePost) => {
//     const [result] = await db.query('UPDATE posts SET ? WHERE id=? LIMIT 1', [updatePost, postId]);
//     return result.affectedRows;
// }

exports.approved = async (commentId) => {
    const [result] = await db.query('UPDATE comments set status=? WHERE id=? LIMIT 1', [commentStatus.APPROVED, commentId]);
    return result.affectedRows;
}

exports.reject = async (commentId) => {
    const [result] = await db.query('UPDATE comments set status=? WHERE id=? LIMIT 1', [commentStatus.REJECT, commentId]);
    return result.affectedRows;
}