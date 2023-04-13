const express = require('express');
const path = require('path');
const cookieController = require('./cookieController');
const producerController = require('../kafka/producer');
const adminController = require('./adminController');
const consumerController = require('./consumerController');

const app = express();
app.use(express.json());

//serve main page of application
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'), (err) => {
    if (err) {
      console.log(err);
    }
  });
});

//once we connect, save hostname and port as a cookie
app.post(
  '/getCluster',
  adminController.connectAdmin,
  cookieController.setCookie,
  (req, res) => {
    return res.status(200).json(res.locals.topics);
  }
);



app.get('/getBrokers', adminController.getBrokers, (req, res) => {
  return res.sendStatus(200);
});


app.post('/', producerController.addMsg, (req, res) => {
  return res.sendStatus(200);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('listening to 3000'));
