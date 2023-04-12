const express = require('express');
const path = require('path');
const producerController = require('../kafka/producer');
const adminController = require('./adminController');
const consumerController = require('./consumerController');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.on('connection', (socket) => {
  console.log('here is socket.id: ', socket.id);
  socket.on('test-event', async (string) => {
    //declare a constant that is the invocation of running consumerController.readMessage
    const messages = await consumerController.readMessages();
    // instead of consumerController.readMessage saving the data on res.locals and going next --- return instead

    console.log('STRING RECEIVED ON SERVER');
    //emit this constant back to front-end
    io.emit('broadcasting', string);
  });
});

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

app.post('/getCluster', adminController.connectAdmin, (req, res) => {
  return res.status(200).json(res.locals.topics);
});

app.post('/readMessages', consumerController.readMessages, (req, res) => {
  return res.status(200).json('EVERYTHING IS WORKING FINE');
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

app.listen(8080, () => console.log('listening to 8080'));
