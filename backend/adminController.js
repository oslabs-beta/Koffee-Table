const { Kafka } = require('kafkajs');

const adminController = {};

adminController.connectAdmin = async (req, res, next) => {
  //recheck clientId and brokers
  const { clientId, port, hostName } = req.body;
  // console.log(clientId);
  // console.log(brokers);
  const kafka = new Kafka({
    clientId: clientId, // "my-app"
    brokers: [`${hostName}:${port}`], // [Joes-Air:9092]
  });
  const admin = kafka.admin();
  admin.connect()
    .then(async () => {
      const topics = await admin.fetchTopicMetadata();
      res.locals.topics = topics;
    await admin.disconnect();

  return next();
    })
    .catch((err) =>{
      return next(err);
    })


  
};

adminController.getBrokers = async (req, res, next) => {
  // const kafka = new Kafka({
  //   clientId: req.cookies.clientId,
  //   brokers: [`${req.cookies.hostName}:${req.cookies.port}`],
  // });
  const { clientId, port, hostName } = req.body;
  const kafka = new Kafka({
    clientId: clientId,
    brokers: [`${hostName}:${port}`],
  });

  const admin = kafka.admin();
  await admin.connect();
  const brokers = await admin.describeCluster();
  console.log(brokers);
  /*
  {
  brokers: [
    { nodeId: 2, host: 'MATT-XPS', port: 9093 },
    { nodeId: 3, host: 'MATT-XPS', port: 9094 },
    { nodeId: 1, host: 'MATT-XPS', port: 9092 }
  ],
  controller: 1,
  clusterId: '9uIFubJvRr-yz1ZqoXvVcA'
  }
  */

  await admin.disconnect();
  return next();
};

module.exports = adminController;
