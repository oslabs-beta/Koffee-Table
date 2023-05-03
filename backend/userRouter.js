const express = require('express');
const userController = require('./controllers/userController');
const router = express.Router();

//route to create user
router.post('/', userController.createUser, (req, res) => {
  return res.status(201).json(res.locals.data);
});

//route to verify user credentials
router.get('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
