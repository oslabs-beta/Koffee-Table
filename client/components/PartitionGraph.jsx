import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  CategoryScale,
  BarElement,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  partitionReplicasData,
  partitionReplicasOptions,
} from '../chart-data/partitionReplicas';
import {
  partitionOffsetsData,
  partitionOffsetsOptions,
} from '../chart-data/partitionOffsets';
import { io } from 'socket.io-client';
import LagTimeGraph from './graphs/LagTimeGraph.jsx';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  CategoryScale,
  BarElement
);

function PartitionGraph({
  metadata,
  offsets,
  topicPartition,
  userInfo,
  setLiveLagTime,
  liveLagTime,
  intervalId,
  setIntervalId,
}) {
  const { topicFromURL } = useParams();
  // console.log(topicFromUrl);
  const topic = metadata.topics.filter(
    (topic) => topic.name === topicFromURL
  )[0];

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log(`PartitionGraph: You connected with id: ${socket.id}`);
      socket.emit('lagTime', {
        topicPartition: topicPartition,
        userInfo: userInfo,
      });
    });
    socket.on('message-received', ({ lagObject, intervalId }) => {
      console.log('PartitionGraph recieved: ', lagObject);
      // console.log('intervalId typeof: ', typeof intervalId);
      // setIntervalId(intervalId.toString());

      /*
      Option 1: {0:0, 1:5}
      Opttion 2: {1:5}
      */
      //set state
      setLiveLagTime((prevState) => {
        const newObject = { ...prevState };
        //iterate through lagObject
        for (const key in lagObject) {
          //for each key in lagObject, 'push' the value into newObject of the same key
          if (!newObject[key]) newObject[key] = [];
          newObject[key].push(lagObject[key]);
        }
        //return newObject
        return newObject;
      });
    });
    return () => {
      socket.emit('clear-interval', {});
      console.log('disconnected');
      socket.close();
    };
  }, []);

  return (
    <div className="graph-page">
      <h2>{topic.name}</h2>
      <div className="chart-layout">
        <div className="chart-wrapper">
          <Pie
            data={partitionReplicasData(topic)}
            options={partitionReplicasOptions}
          />
        </div>
        <div className="chart-wrapper">
          <Bar
            data={partitionOffsetsData(offsets)}
            options={partitionOffsetsOptions}
          />
        </div>
        <div className="chart-wrapper">
          <LagTimeGraph liveLagTime={liveLagTime} />
        </div>
      </div>
    </div>
  );
}

export default PartitionGraph;
