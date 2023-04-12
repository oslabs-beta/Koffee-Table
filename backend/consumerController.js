const { Kafka } = require('kafkajs');

const consumerController = {};

consumerController.readMessages = async (req, res, next) => {
  const { clientId, port, hostName, groupId } = req.body;
  try {
    const kafka = new Kafka({
      clientId: clientId,
      brokers: [`${hostName}:${port}`],
    });

    const consumer = kafka.consumer({ groupId: groupId });
    await consumer.connect();
    console.log('connected');
    consumer.subscribe({
      topic: 'Users',
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ message, topic, partition }) => {
        console.log(
          `message timestamp: ${message.timestamp}`,
          `message: ${JSON.stringify(message, null, 2)}`,
          `Recieved Msg ${message.value} on partition ${partition}`,
          `topic: ${topic}`
        );
      },
    });

    await consumer.disconnect();
    return next();
  } catch (err) {
    console.log('error', err);
  } finally {
    // process.exit(0);
  }
};

module.exports = consumerController;
