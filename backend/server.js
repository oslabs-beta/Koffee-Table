const express = require('express');
const path = require('path');
const producerController = require('../kafka/producer');
const adminController = require('./controllers/adminController');
const userRouter = require('./userRouter');
const schema = require('./graphql-schemas')
const { graphqlHTTP } = require('express-graphql');
const app = express();
app.use(express.json());

// -------entering code ----------------------- //
//routes all requests to user
app.use('/user', userRouter);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

//on topic selection, connect to topic
app.post('/getCluster', adminController.connectAdmin, (req, res) => {
  return res.status(201).json({
    topics: res.locals.topics,
    brokers: res.locals.brokers,
  });
});
//get messages per partition -- change to get req queries/params
app.post('/getOffsets', adminController.getOffsets, (req, res) => {
  return res.status(201).json(res.locals.offsets);
});

//create a topic on client cluster
app.post('/createTopic', adminController.createTopic, (req, res) => {
  return res.status(201).json(res.locals.updatedTopics);
});

//deletes a topic on client cluster
app.post('/deleteTopic', adminController.deleteTopic, (req, res) => {
  return res.status(201).json(res.locals.deletedTopic);
});
//create message for test tool
app.post('/test', producerController.addMsg, (req, res) => {
  return res.sendStatus(201);
});

//serve main page in production mode
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

// maintain page on refresh (React router)
app.get('/*', (req, res) => {
  // res.redirect('/');
  res.sendStatus(200); //delete this in production and revert to line above
});

//global error handler
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

module.exports = app.listen(3000, () => console.log('listening to 3000'));