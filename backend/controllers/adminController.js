const { Kafka } = require('kafkajs');

const adminController = {};

adminController.connectAdmin = async (req, res, next) => {
  const { clientId, port, hostName, groupId } = req.body;
  const kafka = new Kafka({
    clientId: clientId, // "my-app"
    brokers: [`${hostName}:${port}`], // [Joes-Air:9092]
  });
  const admin = kafka.admin();
  admin
    .connect()
    .then(async () => {
      const topics = await admin.fetchTopicMetadata();
      // const partitions = await admin.fetchOffsets({groupId})
      // console.log('partitions: ', partitions)
      const brokers = await admin.describeCluster({ groupId: 'myapp' });
      res.locals.brokers = brokers;
      res.locals.topics = topics;
      await admin.disconnect();
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

adminController.getOffsets = async (req, res, next) => {
  // const kafka = new Kafka({
  //   clientId: req.cookies.clientId,
  //   brokers: [`${req.cookies.hostName}:${req.cookies.port}`],
  // });
  const { clientId, port, hostName, topic } = req.body;
  const kafka = new Kafka({
    clientId: clientId,
    brokers: [`${hostName}:${port}`],
  });

  const admin = kafka.admin();
  await admin.connect();
  const offsets = await admin.fetchTopicOffsets(topic);
  res.locals.offsets = offsets;
  await admin.disconnect();
  return next();
};

adminController.deleteTopic = async (req, res, next) => {
  const { clientId, port, hostName, topic } = req.body;
  const kafka = new Kafka({
    clientId: clientId,
    brokers: [`${hostName}:${port}`],
  });

  const admin = kafka.admin();
  await admin.connect();
  await admin.deleteTopics({
    topics: [`${topic}`],
    timeout: 5000,
  });
  res.locals.deletedTopic = topic
  await admin.disconnect();
  return next();
};

adminController.createTopic = async (req, res, next) => {
  const { clientId, port, hostName, topic, partitionNum } = req.body;
  const kafka = new Kafka({
    clientId: clientId,
    brokers: [`${hostName}:${port}`],
  });

  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [
      {
        topic: topic,
        numPartitions: partitionNum,
      },
    ],
  });
  const topics = await admin.fetchTopicMetadata();
  res.locals.updatedTopics = topics
  await admin.disconnect();
  return next();
};

module.exports = adminController;
