const { Kafka } = require('kafkajs');

// const msg = process.argv[2];



run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Jonathans-Air:9092'],
    });

    const consumer = kafka.consumer({ groupId: 'test' });
    await consumer.connect();
    console.log('connected');
    consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    console.log('this is kafka', await kafka)
    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Recieved Msg ${result.message.value} on partition ${result.partition} 
          here is consumer.events: ${consumer.events}
          here is consumer.describeGroup: ${consumer.describeGroup}
          here is consumer.logger: ${consumer.logger}`
        );
      },
    });
  } catch (err) {
    console.log('error', err);
  } finally {
    // process.exit(0);
  }
}
