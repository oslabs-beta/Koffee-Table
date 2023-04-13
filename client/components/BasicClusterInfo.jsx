import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function BasicClusterInfo(props) {
  const getPartitionInfo = (topicId, partitionId) => {
    props.setTopicPartition([topicId, partitionId]);
    // [x] connect to Kafka cluster which will send back a consumer object wtih topics and parititons
    // [x] when we click paritions on the partition page, we will open a new react component
    // [x] the react component will have the socket that conects to the consumerController websocket and give it the topic and parition (that we get from state);
    // [] websocket will pass back the messages back to the front end on that page
    // [] front end will display those messages
  };

  const buildClusterInfo = (kafkaObject) => {
    if (kafkaObject === null) {
      return 'not connected';
    }

    const topicObject = {};
    for (let i = 0; i < kafkaObject.topics.length; i++) {
      if (kafkaObject.topics[i].name !== '__consumer_offsets') {
        topicObject[kafkaObject.topics[i].name] = [];
        for (let x = 0; x < kafkaObject.topics[i].partitions.length; x++) {
          let partitionId = kafkaObject.topics[i].partitions[x].partitionId;
          let topicId = kafkaObject.topics[i].name;
          let topicPartitionId = kafkaObject.topics[i].name + '-' + partitionId;

          topicObject[kafkaObject.topics[i].name].push(
            <Link
              className='partition'
              to='/messages'
              onClick={() => getPartitionInfo(topicId, partitionId)}
              id={topicPartitionId}
            >
              {partitionId}
            </Link>
          );
        }
      }
    }

    const finalArr = [];
    for (let topic in topicObject) {
      finalArr.push(
        <div>
          <div>Topic: {topic}</div>
          <div>Partitions: {topicObject[topic]}</div>
        </div>
      );
    }
    return finalArr;
  };

  return <div className='topics'>{buildClusterInfo(props.object)}</div>;
}

export default BasicClusterInfo;
