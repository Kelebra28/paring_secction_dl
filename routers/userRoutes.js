const express = require('express');
const { createUser, getAllUsers } = require('../controllers/usersController');
const router = express.Router();

router.post('/createUser', createUser);
router.get('/getAllUser', getAllUsers);

module.exports = router;