const statistics = require('@models/statistics');

exports.index = async (req, res) => {
    const data = {
        totalUsers: await statistics.totalUsers(),
        totalComments: await statistics.totalComments(),
        totalPosts: await statistics.totalPosts(),
        totalViews: await statistics.totalViews()
    }
    res.adminRender('admin/dashboard/index', { layout: 'admin', ...data });
}