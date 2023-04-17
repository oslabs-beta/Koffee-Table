import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function BasicClusterInfo(props) {
  const { metadata, setTopicPartition } = props;

  // [x] connect to Kafka cluster which will send back a consumer object wtih topics and parititons
  // [x] when we click paritions on the partition page, we will open a new react component
  // [x] the react component will have the socket that conects to the consumerController websocket and give it the topic and parition (that we get from state);
  // [] websocket will pass back the messages back to the front end on that page
  // [] front end will display those messages

  const buildClusterInfo = (kafkaObject) => {
    if (kafkaObject === null) {
      return 'not connected';
    }

    const topicObject = {};

    // iterate through topics
    for (let i = 0; i < kafkaObject.topics.length; i++) {
      const topic = kafkaObject.topics[i];
      if (topic.name !== '__consumer_offsets') {
        topicObject[topic.name] = [];

        // iterate through partitions
        for (let x = 0; x < topic.partitions.length; x++) {
          let partition = topic.partitions[x];
          let partitionId = partition.partitionId;
          let topicPartitionId = topic.name + '-' + partitionId;

          topicObject[topic.name].push(
            <Link
              className="partition"
              to="/messages"
              onClick={() => setTopicPartition([topic.name, partitionId])}
              id={topicPartitionId}
            >
              {partitionId}
            </Link>
          );
        }
      }
    }

    const topicPartitionData = [];
    for (let topic in topicObject) {
      topicPartitionData.push(
        <div>
          <div>
            Topic:{' '}
            <Link
              className="topic"
              // to={`/displayPartion/${topic}`}
              to="/displayPartition/Users"
              // onClick={() => setTopicPartition(topic.name, partitionId)}
              // id={topicPartitionId}
            >
              {topic}
            </Link>
          </div>
          <div>Partitions: {topicObject[topic]}</div>
        </div>
      );
    }
    return topicPartitionData;
  };

  return <div className="topics">{buildClusterInfo(metadata)}</div>;
}

export default BasicClusterInfo;
