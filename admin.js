const { Kafka } = require('kafkajs');

const admin = {};

inputs = {
  clientId: 'myapp',
  broker: ['MATT-XPS:9092'],
  //   topic: '',
};

admin.connectAdmin = async (req, res, next) => {
  const { clientId, brokers } = req.body;
  console.log(clientId);
  console.log(brokers);
  const kafka = new Kafka({
    clientId: clientId,
    brokers: brokers,
  });
  const admin = kafka.admin();
  await admin.connect();

  const topics = await admin.fetchTopicMetadata();
  res.locals.topics = topics;

  await admin.disconnect();

  return next();
};

// connectAdmin(inputs.clientId, inputs.broker);

module.exports = admin;
