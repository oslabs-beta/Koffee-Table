const express = require('express');
const path = require('path');
// const cookieController = require('./cookieController');
const producerController = require('../kafka/producer');
const adminController = require('./controllers/adminController');
const consumerController = require('./controllers/consumerController');
const userRouter = require('./userRouter')

const app = express();
app.use(express.json());

// //serve main page of application
// app.get('/*', (req, res) => {
//   // res.sendFile(path.resolve(__dirname, '../client/index.html'));
//   res.redirect('/'); //delete this in production and revert to line above
// });

app.use('/user', userRouter);



//once we connect, save hostname and port as a cookie
app.post(
  '/getCluster',
  adminController.connectAdmin,
  // consumerController.connectConsumer, 
  //cookieController.setCookie
  (req, res) => {
    return res
      .status(200)
      .json({
        topics: res.locals.topics,
        consumer: res.locals.consumer,
        brokers: res.locals.brokers,
      });
  }
);

app.post('/getOffsets', adminController.getOffsets, (req, res) => {
  return res.status(200).json(res.locals.offsets);
});

app.post('/', producerController.addMsg, (req, res) => {
  return res.sendStatus(200);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}


//serve main page of application for dev mode
app.get('/*', (req, res) => { 
  // res.sendFile(path.resolve(__dirname, '../client/index.html'));
  res.redirect('/'); //delete this in production and revert to line above
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
