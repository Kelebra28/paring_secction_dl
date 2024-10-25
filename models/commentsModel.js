const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const { User } = require('./usersModel');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text_comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: 'comments',
    timestamps: false,
});



const createComment = async (commentData) => {
    return await Comment.create(commentData);
};

const getComments = async () => {
    return await Comment.findAll();
};

Comment.belongsTo(User, {
    foreignKey: 'id_user',
})

module.exports = {
    Comment,
    createComment,
    getComments,
};