const db = require('@database/mysql');

module.exports.totalUsers = async (req, res) => {
    const [result] = await db.query('SELECT COUNT(id) as totalUsers FROM users');
    return result[0].totalUsers;
}

module.exports.totalComments = async (req, res) => {
    const [result] = await db.query('SELECT COUNT(id) as totalComments FROM comments');
    return result[0].totalComments;
}

module.exports.totalPosts = async (req, res) => {
    const [result] = await db.query('SELECT COUNT(id) as totalPosts FROM posts');
    return result[0].totalPosts;
}

module.exports.totalViews = async (req, res) => {
    const [result] = await db.query('SELECT SUM(views) as totalViews FROM posts');
    return result[0].totalViews;
}