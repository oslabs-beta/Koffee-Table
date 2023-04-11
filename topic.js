const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['MATT-XPS:9092', 'MATT-XPS:9093', 'MATT-XPS:9094'],
    });

    const admin = kafka.admin();
    await admin.connect();
    console.log('connected');
    await admin.createTopics({
      topics: [
        {
          topic: 'test-topic3',
          numPartitions: 3,
        },
      ],
    });
    console.log('created sucessfully');
    await admin.disconnect();
  } catch (err) {
    console.log('error', err);
  } finally {
    process.exit(0);
  }
}