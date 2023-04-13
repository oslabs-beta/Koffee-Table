import React, { useState, useEffect } from 'react';

function BasicClusterInfo(props) {

    const getPartitionInfo = (topicPartitionId) => {
        console.log('hello partition: ', topicPartitionId);
    }

  const buildClusterInfo = (kafkaObject) => {
    if (kafkaObject === null){

      return "not connected";
    }
    const topicObject = {};
    for (let i = 0; i < kafkaObject.topics.length; i++) {
 
      if(kafkaObject.topics[i].name !== '__consumer_offsets'){
        topicObject[kafkaObject.topics[i].name] = [];
        for (let x = 0; x < kafkaObject.topics[i].partitions.length; x++) {
          let partitionId = kafkaObject.topics[i].partitions[x].partitionId
          let topicPartitionId = kafkaObject.topics[i].name + '-' + partitionId;
          topicObject[kafkaObject.topics[i].name].push(<div className='partition' onClick={() => getPartitionInfo(topicPartitionId)} id={topicPartitionId}>{partitionId}</div>)
        }
      }
    }

    const finalArr = [];
    for(let topic in topicObject) {
        finalArr.push(
            <div>
            <div>Topic: {topic}</div>
            <div>Partitions: {topicObject[topic]}</div> 
        </div>
        )
    }
    return finalArr;
  };


  return <div className="topics">
    {buildClusterInfo(props.object)}
    </div>;
}

export default BasicClusterInfo;
