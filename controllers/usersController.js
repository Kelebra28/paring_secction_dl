const usersModel = require('../models/usersModel');

const createUser = async (req, res) => {
    try {
        const result = await usersModel.createUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await usersModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await usersModel.getAllUsers();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
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