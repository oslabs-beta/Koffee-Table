const { Kafka } = require('kafkajs');

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['MATT-XPS:9092'],
    });

    const admin = kafka.admin();
    await admin.connect();
    console.log('connected');
    // await admin.createTopics({
    //   topics: [
    //     {
    //       topic: 'Brand-New-Topic',
    //       numPartitions: 4,
    //     },
    //   ],
    // });
    await admin.deleteTopics({
        topics: ['The-Real-MVP-Presentation'],
        timeout: 5000,
    })
    console.log('deleted sucessfully');
    await admin.disconnect();
  } catch (err) {
    console.log('error', err);
  } finally {
    process.exit(0);
  }
}
