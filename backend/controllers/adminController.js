const { Kafka } = require('kafkajs');

const adminController = {};

//get metadate on initial connect
adminController.connectAdmin = async (req, res, next) => {
  const { clientId, port, hostName } = req.body;
  const kafka = new Kafka({
    clientId: clientId, 
    brokers: [`${hostName}:${port}`], 
  });
  const admin = kafka.admin();
  admin
    .connect()
    .then(async () => {
      //fetches topic metadata shaped { topics: [ topicMetadata: {name, partition: [partitionErrorCode, partitionId, leader, replicas, isr]}] }
      const topics = await admin.fetchTopicMetadata();
      //returns list of brokers 
      const brokers = await admin.describeCluster({ groupId: clientId });
      res.locals.brokers = brokers;
      res.locals.topics = topics;
      await admin.disconnect();
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//get total number of messages for each partition
adminController.getOffsets = async (req, res, next) => {
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

//delete a topic on client cluster based on deleteTopic route
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

//create a topic on client cluster based on createTopic route
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
  
  //grab all topics metadata to rerender on front end
  const topics = await admin.fetchTopicMetadata();
  res.locals.updatedTopics = topics
  await admin.disconnect();
  return next();
};

module.exports = adminController;
