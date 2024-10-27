const express = require('express');
const router = express.Router();
const NestedComment = require('../models/nestedCommentsModel');

router.post('/nested-comments', async (req, res) => {
    try {
        const { content, comment_id, parent_comment_id } = req.body;
        if (!content) {
            return res.status(400).json({ error: 'Content is required' });
        }
        const nestedComment = await NestedComment.create({ content, comment_id, parent_comment_id });
        res.status(201).json(nestedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/nested-comments', async (req, res) => {
    try {
        const nestedComments = await NestedComment.findAll();
        res.status(200).json(nestedComments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;