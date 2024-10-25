const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false,
});

User.hasMany(Comment, {
    foreignKey: 'id_users',
})


const createUser = async (userData) => {
    return await User.create(userData);
};

const getAllUsers = async () => {
    return await User.findAll();
};

module.exports = {
    User,
    createUser,
    getAllUsers,
};
