const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

const consumerController = {};

consumerController.readMessages = async () => {
  // const { clientId, port, hostName, groupId } = req.body;

  try {
    const kafka = new Kafka({
      // clientId: "clientId",
      // brokers: [`${hostName}:${port}`],
      clientId: 'myapp',
      brokers: [`MATT-XPS:9092`],
    });

    const consumer = await kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('connected');

    // console.log('here is the consumer: ', consumer);

    await consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async (result) => {
        console.log(`Received message: ${result.message.value}`)
        io.emit('broadcasting', result.message.value.toString());
      },
    });
    // return next();
  } catch (err) {
    console.log('error', err);
  }
};

io.on('connection', (socket) => {
  console.log('here is socket.id: ', socket.id);
  socket.on('test-event', async () => {
    //declare a constant that is the invocation of running consumerController.readMessage
    await consumerController.readMessages();
    // instead of consumerController.readMessage saving the data on res.locals and going next --- return instead
    //emit this constant back to front-end
  });
});



module.exports = consumerController;
