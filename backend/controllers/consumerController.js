const { Kafka } = require('kafkajs');

// -------------------------------------- //
//establish io as a global variable and list possible origin ports on frontend
const io = require('socket.io')(3001, {
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://localhost:8081',
    ],
  },
});
// -------------------------------------- //

const consumerController = {};

// global variables
let consumer;

//modular consumer connection and subscription
async function connectConsumer(topic, userInfo) {
  console.log('this is current topic', topic);
  //connect and subscribe to kafka cluster
  const kafka = new Kafka({
    clientId: userInfo.clientId,
    brokers: [`${userInfo.hostName}:${userInfo.port}`],
  });
  const consumer = await kafka.consumer({ groupId: 'test1' });
  await consumer.connect();
  await consumer.subscribe({
    topic: topic.name,
    fromBeginning: false,
  });
  return consumer;
  // ------------------------------------ //
}

//send messages to front end for MESSAGES component
consumerController.readMessages = async (consumer) => {
  try {
    // --------------------------------- //
    //run consumer and broadcast messages
    await consumer.run({
      eachMessage: async (result) => {
        console.log('this is result partition', result.partition);
        console.log('result: ', result);

        io.emit(
          'broadcasting',
          result.message.value.toString(),
          result.partition
        );
      },
    });
  } catch (err) {
    console.log('error', err);
  }
};

//send messages to front end for PARTIONGRAPH component
consumerController.lagTime = async (consumer, currentTopic) => {
  disconnected = false;
  try {
    // -------------------------------- //
    //run consumer and broadcast message
    await consumer.run({
      eachMessage: async (result) => {
        //calculation for lag time
        const lagTime = Date.now() - result.message.timestamp;
        io.emit('message-received', result.partition, lagTime);
      },
    });
  } catch (err) {
    console.log('error', err);
  }
};

// --------------------------------------- //
//receive connection from front end
io.on('connection', async (socket) => {
  console.log('here is socket.id: ', socket.id);

  //receive topic and user info from MESSAGES component
  socket.on('info-messages', async (result) => {
    consumer = await connectConsumer(result.topic, result.userInfo);
    await consumerController.readMessages(consumer);
  });

  //receive topic and user info from PARTITIONGRAPH component
  socket.on('info-graph', async (result) => {
    consumer = await connectConsumer(result.topic, result.userInfo);
    await consumerController.lagTime(consumer, result.topic);
  });

  //on socket disconnect, disconnect the consumer
  socket.on('disconnect', async () => {
    await consumer.disconnect();
    console.log('consumer disconnected');
  });
});

module.exports = consumerController;
