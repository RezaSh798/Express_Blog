const post = require('@models/post');
const user = require('@models/user');
const dateService = require('@services/dateService');
const postValidator = require('@validators/post');

exports.index = async (req, res) => {
   const posts = await post.index();
   const presentedPosts = posts.map(post => {
        post.jalali_created_at = dateService.toPersianDate(post.created_at);
        return post;
   });
   res.adminRender('admin/posts/index', { layout: 'admin', posts: presentedPosts });
}

exports.create = async (req, res) => {
   const users = await user.findAll(['id', 'full_name']);
   res.adminRender('admin/posts/create', { layout: 'admin', users });
}

exports.store = async(req, res) => {
   const newPost = {
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      author_id: req.body.author_id,
      status: req.body.status
   }

   const errors = postValidator.create(newPost);
   if(errors.length) {
      return res.adminRender('admin/posts/create', { layout: 'admin', errors, hasError: true });
   }
   const insertId = await post.store(newPost);
   if(insertId) {
      res.redirect('/admin/posts');
   }
      
}

exports.remove = async (req, res) => {
   const result = await post.remove(req.params.postId);
   res.redirect('/admin/posts');
}

exports.edit = async (req, res) => {
   const users = await user.findAll(['id', 'full_name']);
   const editPost = await post.find(req.params.postId);
   res.adminRender('admin/posts/edit', { layout: 'admin', users, editPost, 
      helpers: {
         isPostAuthor: function(userId, options) {
            return editPost.author_id === userId ? options.fn(this) : options.inverse(this);
         },
         isSelectedStatus: function(status, options) {
            return editPost.status === status ? options.fn(this) : options.inverse(this);
         }
      } 
   });
}

exports.update = async (req, res) => {
   const updatePost = {
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      author_id: req.body.author_id,
      status: req.body.status
   }
   const result = await post.update(req.params.postId, updatePost);
   res.redirect('/admin/posts');
}