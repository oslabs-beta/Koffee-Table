const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

const consumerController = {};

consumerController.readMessages = async (req, res, next) => {
  const { clientId, port, hostName, groupId } = req.body;

  try {
    const kafka = new Kafka({
      clientId: clientId,
      brokers: [`${hostName}:${port}`],
    });

    const consumer = kafka.consumer({ groupId: groupId });
    await consumer.connect();
    console.log('connected');

    console.log('here is the consumer: ', consumer);

    consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    console.log('this is kafka', await kafka);
    console.log('--------------');
    io.on('connection', (socket) => {
      console.log('here is socket.id: ', socket.id);
      socket.on('test-event', (string) => {
        console.log('STRING RECEIVED ON SERVER');
        io.emit('broadcasting', string);
      });
    });
    console.log('--------------');
    // await consumer.run({
    //   eachMessage: async (result) => {
    //     console.log(
    //       `Recieved Msg ${result.message.value} on partition ${result.partition}`
    //     );
    //   },
    // });
    return next();
  } catch (err) {
    console.log('error', err);
  }
};

module.exports = consumerController;
