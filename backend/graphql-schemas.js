const { Kafka } = require('kafkajs');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const OffsetsData = new GraphQLObjectType({
  name: 'OffsetMetaData',
  description: 'Offset data for a topic',
  fields: () => ({
    partition: { type: GraphQLInt },
    offset: { type: GraphQLString },
    high: { type: GraphQLString },
    low: { type: GraphQLString },
  }),
});

const TopicMetadata = new GraphQLObjectType({
  name: 'TopicMetadata',
  description: 'List of all the topics from a Kafka cluster',
  fields: () => ({
    name: { type: GraphQLNonNull(GraphQLString) },
    partitions: { type: new GraphQLList(PartitionType) },
  }),
});

const PartitionType = new GraphQLObjectType({
  name: 'PartitionMetadata',
  description: 'List of partition metadata from a Kafka Topic',
  fields: () => ({
    partitionErrorCode: { type: GraphQLInt },
    partitionId: { type: GraphQLInt },
    leader: { type: GraphQLInt },
    offlineReplicas: { type: GraphQLList(GraphQLString) },
    isr: { type: GraphQLList(GraphQLInt) },
    replicas: { type: GraphQLList(GraphQLInt) },
  }),
});

const Brokers = new GraphQLObjectType({
  name: 'Broker',
  description: 'One of the brokers',
  fields: () => ({
    nodeId: { type: GraphQLInt },
    host: { type: GraphQLString },
    port: { type: GraphQLInt },
  }),
});

const BrokersData = new GraphQLObjectType({
  name: 'BrokersData',
  description: 'List of connected brokers from Kafka',
  fields: () => ({
    controller: { type: GraphQLInt },
    clusterId: { type: GraphQLString },
    brokers: { type: GraphQLList(Brokers) },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    addTopic: {
      type: GraphQLList(TopicMetadata),
      description: 'Add a topic',
      args: {
        clientId: { type: GraphQLNonNull(GraphQLString) },
        port: { type: GraphQLNonNull(GraphQLInt) },
        hostName: { type: GraphQLNonNull(GraphQLString) },
        topic: { type: GraphQLNonNull(GraphQLString) },
        partitionNum: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, args) => {
        try {
          const kafka = new Kafka({
            clientId: args.clientId,
            brokers: [`${args.hostName}:${args.port}`],
          });

          const admin = kafka.admin();
          await admin.connect();
          await admin.createTopics({
            topics: [
              {
                topic: args.topic,
                numPartitions: args.partitionNum,
              },
            ],
          });
          const topics = await admin.fetchTopicMetadata();
          await admin.disconnect();
          return topics.topics;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    deleteTopic: {
      type: GraphQLString,
      description: 'Delete a topic',
      args: {
        clientId: { type: GraphQLNonNull(GraphQLString) },
        port: { type: GraphQLNonNull(GraphQLInt) },
        hostName: { type: GraphQLNonNull(GraphQLString) },
        topic: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const kafka = new Kafka({
            clientId: args.clientId,
            brokers: [`${args.hostName}:${args.port}`],
          });

          const admin = kafka.admin();
          await admin.connect();
          await admin.deleteTopics({
            topics: [`${args.topic}`],
            timeout: 5000,
          });
          await admin.disconnect();
          return args.topic;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    topics: {
      type: GraphQLList(TopicMetadata),
      description: 'List of All Topics',
      args: {
        clientId: { type: GraphQLString },
        port: { type: GraphQLInt },
        hostName: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const kafka = new Kafka({
            clientId: args.clientId,
            brokers: [`${args.hostName}:${args.port}`],
          });
          const admin = kafka.admin();
          await admin.connect();
          const metadata = await admin.fetchTopicMetadata();
          await admin.disconnect();
          return metadata.topics;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    brokers: {
      type: BrokersData,
      description: 'List of All Brokers',
      args: {
        clientId: { type: GraphQLString },
        port: { type: GraphQLInt },
        hostName: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const kafka = new Kafka({
            clientId: args.clientId,
            brokers: [`${args.hostName}:${args.port}`],
          });
          const admin = kafka.admin();
          await admin.connect();
          const brokers = await admin.describeCluster({
            groupId: args.clientId,
          });
          await admin.disconnect();
          return brokers;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    offsets: {
      type: GraphQLList(OffsetsData),
      description: 'List of Offset Metadata for A Topic',
      args: {
        clientId: { type: GraphQLString },
        port: { type: GraphQLInt },
        hostName: { type: GraphQLString },
        topic: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const kafka = new Kafka({
            clientId: args.clientId,
            brokers: [`${args.hostName}:${args.port}`],
          });
          const admin = kafka.admin();
          await admin.connect();
          const offsets = await admin.fetchTopicOffsets(args.topic);
          await admin.disconnect();
          return offsets;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  }),
});

// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
