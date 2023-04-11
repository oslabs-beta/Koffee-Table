import React, { useState, useEffect } from 'react';

function BasicClusterInfo(props) {

    const getPartitionInfo = (topicPartitionId) => {
        console.log('hello partition: ', topicPartitionId);
    }

  const buildClusterInfo = (kafkaObject) => {
    const topicObject = {};
    for (let i = 0; i < kafkaObject.topics.length; i++) {
      topicObject[kafkaObject.topics[i].name] = [];
      for (let x = 0; x < kafkaObject.topics[i].partitions.length; x++) {
        
        let partitionId = kafkaObject.topics[i].partitions[x].partitionId
        let topicPartitionId = kafkaObject.topics[i].name + '-' + partitionId;

        topicObject[kafkaObject.topics[i].name].push(<button onClick={() => getPartitionInfo(topicPartitionId)} id={topicPartitionId}>{partitionId}</button>)
      }
    }
    const finalArr = [];
    for(let topic in topicObject) {
        finalArr.push(
            <div>
            <div>{topic}</div>
            {topicObject[topic]}
        </div>
        )
    }
    return finalArr;

  };


  return <div>{buildClusterInfo(props.object)}</div>;
}

export default BasicClusterInfo;
