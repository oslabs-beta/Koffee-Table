const { Kafka } = require('kafkajs');

// const msg = process.argv[2];

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['MATT-XPS:9093'],
    });

    const consumer = kafka.consumer({ groupId: 'group2' });
    await consumer.connect();
    console.log('connected');
    consumer.subscribe({
      topic: 'test-topic3',
      fromBeginning: true,
    });
    console.log('this is kafka', await kafka);

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved Msg ${result.message.value} on partition ${result.partition}`
        );
      },
    });
  } catch (err) {
    console.log('error', err);
  } finally {
    // process.exit(0);
  }
}
