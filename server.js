const express = require('express');
const app = express();
const admin = require('./admin');

app.use(express.json());

//listen for information from admin.js, console.log in this terminal ('messages: ', message)
app.use('/', admin.connectAdmin, (req, res) => {
  return res.status(200).json(res.locals.topics);
});

app.listen(8080, () => console.log('connected to port 8080'));
