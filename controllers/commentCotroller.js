const commentModel = require('../models/commentsModel');

const createComment = async (req, res) => {
    try {
        const result = await commentModel.createComment(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comment = await commentModel.getComments();
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
}
};

module.exports = {
    createComment,
    getAllComments,
};