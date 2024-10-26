const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('../models/usersModel');

const Comment = sequelize.define('Comment', {
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_users: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: false 
});

Comment.belongsTo(User, { foreignKey: 'id_users' });

module.exports = Comment;