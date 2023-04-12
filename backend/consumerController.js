const { Kafka } = require('kafkajs');

const consumerController = {};

consumerController.readMessages = async (req, res, next) => { 
    const { clientId, port, hostName, groupId } = req.body;
    try {
        const kafka = new Kafka({
          clientId: clientId,
          brokers: [`${hostName}:${port}`]
        });
    
        const consumer = kafka.consumer({ groupId: groupId });
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

module.exports = consumerController;
