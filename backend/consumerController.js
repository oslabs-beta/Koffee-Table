const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

const consumerController = {};

consumerController.readMessages = async (topicPartition, userInfo) => {
  console.log("this is user ", userInfo)

  try {
    const kafka = new Kafka({
      clientId: userInfo[0],
      brokers: [`${userInfo[1]}:${userInfo[2]}`],
    });
    console.log('here is your trauma: ', [`${userInfo.hostName}:${userInfo.port}`])

    const consumer = await kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('connected');


    await consumer.subscribe({
      topic: topicPartition[0], 
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async (result) => {
        //topic parition contains an array as [topic, parition] 
        console.log('this is partition', result.partition)
        if (topicPartition[1] === result.partition){
          console.log('i am broadcasting')
          io.emit('broadcasting', result.message.value.toString()); 
        }
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
    await consumerController.readMessages(result.topicPartition, result.userInfo);
    // instead of consumerController.readMessage saving the data on res.locals and going next --- return instead
    //emit this constant back to front-end
  });
});



module.exports = consumerController;
