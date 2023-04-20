const { Kafka } = require('kafkajs');
const io = require('socket.io')(3001, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:8080'],
  },
});

const consumerController = {};

let intervalId;
let disconnected;

consumerController.readMessages = async (topicPartition, userInfo) => {
  console.log('this is user ', userInfo);
  console.log('topicPartition', topicPartition);

  try {
    const kafka = new Kafka({
      clientId: userInfo[0],
      brokers: [`${userInfo[1]}:${userInfo[2]}`],
    });

    const consumer = await kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('consumerController connected');

    await consumer.subscribe({
      topic: topicPartition[0],
      fromBeginning: true,
    });
    console.log('post subscribe');
    await consumer.run({
      eachMessage: async (result) => {
        //topicPartition contains an array as [topic, parition]
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

consumerController.lagTime = async (topicPartition, userInfo) => {
  console.log('this is user ', userInfo);
  console.log('topicPartition', topicPartition);
  disconnected = false;

  try {
    const kafka = new Kafka({
      clientId: userInfo[0],
      brokers: [`${userInfo[1]}:${userInfo[2]}`],
    });

    const consumer = await kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('consumerController.lagTime connected');

    await consumer.subscribe({
      topic: topicPartition[0],
      fromBeginning: true,
    });
    // object to hold lag times per partition
    let lagTimesPartitions = {};
    //for loop as long as i < topicPartition[1] creating a key and value of []
    for (let i = 0; i < topicPartition[1]; i++) {
      lagTimesPartitions[i] = [];
    }
    await consumer.run({
      eachMessage: async (result) => {
        // each time we get a message, build out the lagTimePartitions object by pushing the lagTime into an array
        
        //just push the lag time
        const lagTime = Date.now() - result.message.timestamp;
        console.log('LAG TIME!', lagTime);
        lagTimesPartitions[result.partition].push(lagTime);
      },
    });

    intervalId = setInterval(() => {
      //after 3s, average the array of lag time for each partition
      // let average;
      //create new object
      console.log('setInterval called', Date.now());
      for (const partition in lagTimesPartitions) {
        let timestamps = lagTimesPartitions[partition];
        //if the length timestamps is 0, set the value to 0
        if (!timestamps.length) {
          average = 0;
        }
        //else get the average
        else average = timestamps.reduce((a, b) => a + b) / timestamps.length;
        //add this average to new object and send back new object
        lagTimesPartitions[partition] = average;
      }
      /*
        what we have: 
        { 
          0 : [5, 6, 6, 1]
          1: [3, 3, 3, 3]
        }
        what we want to looks like:
        { 
          0: 6
          1: 3
        }
      */
      io.emit('message-received', {
        lagObject: lagTimesPartitions,
        // intervalId: intervalId,
      });
      // reset messageList
      lagTimesPartitions = {};
      for (let i = 0; i < topicPartition[1]; i++) {
        lagTimesPartitions[i] = [];
      }

      if (disconnected) {
        console.log('stop it now!!!');
        clearInterval(intervalId);
      }
    }, 5000);
  } catch (err) {
    console.log('error', err);
  }
};

io.on('connection', (socket) => {
  console.log('here is socket.id: ', socket.id);
  socket.on('messages', async (result) => {
    console.log('this is current partition', result.topicPartition[1]);
    await consumerController.readMessages(
      result.topicPartition,
      result.userInfo
    );
  });
  socket.on('lagTime', async (result) => {
    console.log('recieved connection in LagTime');
    await consumerController.lagTime(result.topicPartition, result.userInfo);
  });
  socket.on('clear-interval', () => {
    console.log('socket.on gets message');
    disconnected = true;
  });
});

module.exports = consumerController;
