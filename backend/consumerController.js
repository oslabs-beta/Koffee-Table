const { Kafka } = require('kafkajs');
// const io = require('socket.io')(3001, {
//   cors: {
//     origin: ['http://localhost:8080'],
//   },
// });

const consumerController = {};

consumerController.readMessages = async () => {
  // const { clientId, port, hostName, groupId } = req.body;

  try {
    const kafka = new Kafka({
      // clientId: "clientId",
      // brokers: [`${hostName}:${port}`],
      clientId: 'myapp',
      brokers: [`Joes-Air:9092`],
    });

    const consumer = kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('connected');

    console.log('here is the consumer: ', consumer);

    consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    console.log('this is kafka', await kafka);
    console.log('--------------');
    // io.on('connection', (socket) => {
    //   console.log('here is socket.id: ', socket.id);
    //   socket.on('test-event', (string) => {
    //     console.log('STRING RECEIVED ON SERVER');
    //     io.emit('broadcasting', string);
    //   });
    // });
    // console.log('--------------');
    let array = [];
    const finalMessages = (message) => {
      array.push(message);
      return array;
    };

    const allMessages = {
      eachMessage: async (result) => {
        finalMessages(result.message.value);
        console.log(
          `Recieved Msg ${result.message.value} on partition ${result.partition}`
        );
        finalMessages(result.message.value);
        // save data as a variable and return that data
        // return result.message.value;
      },
    };
    await consumer.run(allMessages);
    // return oneMessage;
    return array;
    //
    // return next();
  } catch (err) {
    console.log('error', err);
  }
};

module.exports = consumerController;
