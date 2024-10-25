const express = require('express');
const { createComment, getAllComments} = require('../controllers/commentCotroller');
const router = express.Router();

router.post('/createComment', createComment);
router.get('/getAllComment', getAllComments);

module.exports = router;