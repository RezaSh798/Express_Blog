const user = require('@models/user');
const dateService = require('@services/dateService');
const hashService = require('@services/hashService');
const userValidator = require('@validators/user');

exports.index = async (req, res) => {
   const users = await user.findAll();
   const presentedusers = users.map(user => {
        user.jalali_created_at = dateService.toPersianDate(user.created_at);
        return user;
   });
   res.adminRender('admin/users/index', { layout: 'admin', users: presentedusers });
}

exports.create = async (req, res) => {
   res.adminRender('admin/users/create', { layout: 'admin' });
}

exports.store = async(req, res) => {
   const newuser = {
      full_name: req.body.full_name,
      email: req.body.email,
      password: hashService.hashPassword(req.body.password),
      role: req.body.role
   }
   const errors = userValidator.create(newuser);
   if(errors.length) {
      return res.adminRender('admin/users/create', { layout: 'admin', errors, hasError: true });
   }
   const insertId = await user.store(newuser);
   if(insertId) {
      res.redirect('/admin/users');
   }
      
}

exports.remove = async (req, res) => {
   const result = await user.remove(req.params.userId);
   res.redirect('/admin/users');
}

exports.edit = async (req, res) => {
    const editUser = await user.find(req.params.userId);
    res.adminRender('admin/users/edit', { layout: 'admin', editUser, 
      helpers: {
         isSelectedRole: function(role, options) {
            return editUser.role === role ? options.fn(this) : options.inverse(this);
         }
      } 
   });
}

exports.update = async (req, res) => {
   const updateuser = {
      full_name: req.body.full_name,
      email: req.body.email,
      password: hashService.hashPassword(req.body.password),
      role: req.body.role
   }
   const result = await user.update(req.params.userId, updateuser);
   res.redirect('/admin/users');
}