import React, { useState, useEffect } from 'react';

function BasicClusterInfo(props) {

    const getPartitionInfo = (topicPartitionId) => {
        console.log('hello partition: ', topicPartitionId);
    }

  const buildClusterInfo = (kafkaObject) => {
    if (kafkaObject === null){

      kafkaObject = {
          topics: [
            {
              name: 'Users',
              partitions: [
                {
                  partitionErrorCode: 0,
                  partitionId: 0,
                  leader: 2,
                  replicas: [2],
                  isr: [2],
                  offlineReplicas: [],
                },
                {
                  partitionErrorCode: 0,
                  partitionId: 1,
                  leader: 3,
                  replicas: [3],
                  isr: [3],
                  offlineReplicas: [],
                },
              ],
            },
            {
              name: 'test-topic2',
              partitions: [
                {
                  partitionErrorCode: 0,
                  partitionId: 0,
                  leader: 3,
                  replicas: [3],
                  isr: [3],
                  offlineReplicas: [],
                },
                {
                  partitionErrorCode: 0,
                  partitionId: 2,
                  leader: 2,
                  replicas: [2],
                  isr: [2],
                  offlineReplicas: [],
                },
                {
                  partitionErrorCode: 0,
                  partitionId: 1,
                  leader: 1,
                  replicas: [1],
                  isr: [1],
                  offlineReplicas: [],
                },
              ],
            },
          ],
        };

      // return "not connected";
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
