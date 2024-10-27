const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Comment = require('./commentsModel');

const NestedComment = sequelize.define('NestedComment', {
    comment_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Comment,
            key: 'id'
        }
    },
    parent_comment_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

NestedComment.belongsTo(Comment, { foreignKey: 'comment_id' });
NestedComment.belongsTo(NestedComment, { as: 'ParentComment', foreignKey: 'parent_comment_id' });
NestedComment.hasMany(NestedComment, { as: 'NestedComments', foreignKey: 'parent_comment_id' });

module.exports = NestedComment;