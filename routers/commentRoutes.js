const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const Comment = require('../models/commentsModel');

router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [{
                model: User,
                attributes: ['username', 'email']
            }]
        });
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/comments', async (req, res) => {
    try {
        const { content, email } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        let user = await User.findOne({ where: { email } });
        if (!user) {
            user = await User.create({ email, username: email });
        }
        const newComment = await Comment.create({ content, id_users: user.id });
        res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.content = content;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        await comment.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;