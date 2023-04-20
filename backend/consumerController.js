const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  },
});

const consumerController = {};

consumerController.readMessages = async (topic, userInfo) => {
  console.log("-----")
  console.log(topic)
  console.log("-----")
  try {
    const kafka = new Kafka({
      clientId: userInfo[0],
      brokers: [`${userInfo[1]}:${userInfo[2]}`],
    });

    const consumer = await kafka.consumer({ groupId: 'test' });
    await consumer.connect();

    await consumer.subscribe({
      topic: topic,
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async (result) => {
        //topicPartition contains an array as [topic, parition]
          // messageList = []
          //each time we get a message, build out the object
          // message = {}
          // timeConsumed = Date.now()

          /*send back an array object 
          const messageList = 
          [
            {
              lag: timeConsumed - result.message.timestamp; number[]
              partition: result.partition; 0
            },
            {
              lag: timeConsumed - result.message.timestamp; number[]
              partition: result.partition; 1
            }
          ]*/
          io.emit('broadcasting', result.message.value.toString(), result.partition);
          setInterval(() => {
            //take the average of all the numbers in lag
            io.emit('message-received', 'messageList');
            //reset messageList
          }, 15000);
      },
    });
    // return next();
  } catch (err) {
    console.log('error', err);
  }
};

io.on('connection', (socket) => {
  console.log('here is socket.id: ', socket.id);
  socket.on('messages', async (result) => {
    //declare a constant that is the invocation of running consumerController.readMessage
    await consumerController.readMessages(
      result.topic,
      result.userInfo
    );
    // instead of consumerController.readMessage saving the data on res.locals and going next --- return instead
    //emit this constant back to front-end
  });
});

module.exports = consumerController;
