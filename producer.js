const { Kafka } = require('kafkajs');

// const msg = process.argv[2];

const producerController = {};

producerController.addMsg = (req, res, next) => {
  // console.log("here")
  // const input = JSON.stringify(req.body.input);
  const input2 = req.body.input
  run(input2);
  return next();
};

// run("input")

async function run(input) {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['MATT-XPS:9092'],
    });

    const producer = kafka.producer();
    await producer.connect();
    console.log('connected');
    let partition;
    if (input == 'a') {
      partition = 0;
    } else if (input == 'b') {
      partition = 1;
    } else {
      console.log("---")
      console.log(input === "a")
      console.log(input)
      console.log("---")
      partition = 2;
    }
    const result = await producer.send({
      topic: 'test-topic3',
      messages: [
        {
          value: input,
          partition: partition,
        },
      ],
    });
    // await admin.createTopics({
    //     "topics": [{
    //         "topic": "Users",
    //         "numPartitions": 2
    //     }]
    // })
    console.log('created sucessfully', JSON.stringify(result));
    console.log('Here is producer.events: ', producer.events);
    await producer.disconnect();
  } catch (err) {
    console.log('error', err);
  } finally {
    // setTimeout( () => run("later massage"), 2000)
    // process.exit(0);
  }
}

module.exports = producerController;
