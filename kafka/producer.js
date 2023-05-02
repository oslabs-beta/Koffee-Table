const { Kafka } = require('kafkajs');

// const msg = process.argv[2];

const producerController = {};

producerController.addMsg = (req, res, next) => {
  const input = JSON.stringify(req.body.input);
  run(input);
  return next();
};

async function run(input) {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Jonathans-Air:9092'],
    });

    const producer = kafka.producer();
    await producer.connect();
    let array = [0, 1, 2, 3, 4, 5]
    let partition = Math.floor(Math.random() * array.length);
    // if (input.toLowerCase() === input) {
    //   partition = 0;
    // } else {
    //   partition = 1;
    // }
    const result = await producer.send({
      topic: 'Test-Topic',
      messages: [
        {
          value: input,
          partition: array[partition],
        },
      ],
    });
    // await admin.createTopics({
    //     "topics": [{
    //         "topic": "Users",
    //         "numPartitions": 2
    //     }]
    // })

    await producer.disconnect();
  } catch (err) {
    console.log('error', err);
  } finally {
    // setTimeout( () => run("later massage"), 2000)
    // process.exit(0);
  }
}

module.exports = producerController;
