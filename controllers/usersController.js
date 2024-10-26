const { User, Comment } = require('../models/associations');

const createUser = async (req, res) => {
    try {
        const result = await User.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: [{
                model: Comment,
                attributes: ['content']
            }]
        });
        if (!user || user.Comments.length === 0) {
            return res.status(404).json({ error: 'User not found or has no comments' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{
                model: Comment,
                attributes: ['content']
            }]
        });
        const usersWithComments = users.filter(user => user.Comments.length > 0);
        if (usersWithComments.length === 0) {
            return res.status(404).json({ error: 'No users with comments found' });
        }
        res.status(200).json(usersWithComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    getAllUsers,
};