const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Jonathans-Air:9092'],
    });

    const admin = kafka.admin();
    await admin.connect();
    console.log('connected');
    await admin.createTopics({
      topics: [
        {
          topic: 'Users',
          numPartitions: 2,
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
