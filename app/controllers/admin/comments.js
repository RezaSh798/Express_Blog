const post = require('@models/post');
const user = require('@models/user');
const comment = require('@models/comment');
const dateService = require('@services/dateService');
const commentStatus = require('@models/comment/commentStatus');

exports.index = async (req, res) => {
   const comments = await comment.index();
   const presentedcomments = comments.map(comment => {
        comment.jalali_created_at = dateService.toPersianDate(comment.created_at);
        return comment;
   });
   res.adminRender('admin/comments/index', { layout: 'admin', comments: presentedcomments, helpers: {
         commentBackground: function(status, options) {
            let cssClass = 'alert ';
            switch(true) {
               case status === commentStatus.APPROVED:
                  cssClass += 'alert-success';
                  break;
               case status === commentStatus.REJECT:
                  cssClass += 'alert-danger';
                  break;
               case status === commentStatus.REVIEW:
                  cssClass += 'alert-dark';
                  break;   
            }
            return cssClass;
         }
      }
   });
}

// exports.create = async (req, res) => {
//    const users = await user.findAll(['id', 'full_name']);
//    res.adminRender('admin/posts/create', { layout: 'admin', users });
// }

// exports.store = async(req, res) => {
//    const newPost = {
//       title: req.body.title,
//       slug: req.body.slug,
//       content: req.body.content,
//       author_id: req.body.author_id,
//       status: req.body.status
//    }

//    const errors = postValidator.create(newPost);
//    if(errors.length) {
//       return res.adminRender('admin/posts/create', { layout: 'admin', errors, hasError: true });
//    }
//    const insertId = await post.store(newPost);
//    if(insertId) {
//       res.redirect('/admin/posts');
//    }
      
// }

exports.delete = async (req, res) => {
   const result = await post.delete(req.params.commentId);
   res.redirect('/admin/comments');
}

// exports.edit = async (req, res) => {
//    const users = await user.findAll(['id', 'full_name']);
//    const editPost = await post.find(req.params.postId);
//    res.adminRender('admin/posts/edit', { layout: 'admin', users, editPost });
// }

// exports.update = async (req, res) => {
//    const updatePost = {
//       title: req.body.title,
//       slug: req.body.slug,
//       content: req.body.content,
//       author_id: req.body.author_id,
//       status: req.body.status
//    }
//    const result = await post.update(req.params.postId, updatePost);
//    res.redirect('/admin/posts');
// }

exports.approved = async (req, res) => {
   const result = await comment.approved(req.params.commentId);
   res.redirect('/admin/comments');
}

exports.reject = async (req, res) => {
   const result = await comment.reject(req.params.commentId);
   res.redirect('/admin/comments');
}