const User = require('./User');
const Comment = require('./Comment');

User.associate({ Comment });
Comment.associate({ User });

module.exports = { User, Comment };