const { Kafka } = require('kafkajs');

const admin = {};

admin.connectAdmin = async (req, res, next) => {
  //recheck clientId and brokers
  const { clientId, port, hostName } = req.body;
  // console.log(clientId);
  // console.log(brokers);
  const kafka = new Kafka({
    clientId: clientId, // "my-app"
    brokers: [`${hostName}:${port}`], // [Joes-Air:9092]
  });
  const admin = kafka.admin();
  await admin.connect();

  const topics = await admin.fetchTopicMetadata();
  res.locals.topics = topics;

  await admin.disconnect();

  return next();
};

module.exports = adminController;