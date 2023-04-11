const express = require('express');
const app = express();
const path = require('path');
const admin = require('./admin');

app.use(express.json());

//listen for information from admin.js, console.log in this terminal ('messages: ', message)
app.use('/connect', admin.connectAdmin, (req, res) => {
  return res.status(200).json(res.locals.topics);
});

app.use('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.listen(8080, () => console.log('connected to port 8080'));
