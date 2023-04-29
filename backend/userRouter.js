const express = require('express');
const userController = require('./controllers/userController');
const router = express.Router();

router.delete('/nukeDatabase', userController.selfDestruct, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.delete('/', userController.deletUser, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.patch('/', userController.findAndUpdate, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.post('/', userController.creatUser, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get('/', userController.readUser, (req, res) => {
  return res.status(200).json(res.locals.data);
});

router.get('/login', userController.login, (req, res) => {
  return res.status(200).json(res.locals.data);
});

module.exports = router;
