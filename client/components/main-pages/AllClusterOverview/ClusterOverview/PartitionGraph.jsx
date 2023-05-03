import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import {
  partitionReplicasData,
  partitionReplicasOptions,
} from './static-chart-data/partitionReplicas';
import {
  partitionOffsetsData,
  partitionOffsetsOptions,
} from './static-chart-data/partitionOffsets';
import { io } from 'socket.io-client';
import LagTimeGraph from './graphs/LagTimeGraph.jsx';
import MessageVelocity from './graphs/MessageVelocity.jsx';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement
);

function PartitionGraph({
  offsets,
  userInfo,
  setLiveLagTime,
  liveLagTime,
  messageVelocity,
  setMessageVelocity,
  time,
  setTime,
  currentTopic,
  topics,
}) {
  const { topicFromURL } = useParams();
  const topic = topics.filter((topic) => topic.name === topicFromURL)[0];

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      socket.emit('info-graph', {
        topic: currentTopic,
        userInfo: userInfo,
      });
    });

    let lagTimesPartitions = {};
    let lagTimeAverages = {};
    let currentMessageVelocity = {};

    socket.on('message-received', (partition, lagTime) => {
      //handle abnormal lagtimes from initial connection
      if (lagTime > 100) {
        lagTime = 0;
      }
      if (!lagTimesPartitions[partition]) {
        lagTimesPartitions[partition] = [lagTime];
      } else {
        lagTimesPartitions[partition].push(lagTime);
      }
    });

    // ---------------------------------------------------- //
    // interval every 3 seconds to update lag time and velocity
    const intervalId = setInterval(() => {
      //average lagtimepartition arrays after 3 seconds
      for (const key in lagTimesPartitions) {
        let average = 0;
        let array = lagTimesPartitions[key];
        array.forEach((element) => {
          average += element;
        });
        average = average / lagTimesPartitions[key].length;
        lagTimeAverages[key] = average;
        currentMessageVelocity[key] = lagTimesPartitions[key].length;
      }

      //loop to add 0 values to partitions with no messages in the current interval
      for (let i = 0; i < currentTopic.partitions.length; i++) {
        if (!lagTimeAverages[i]) lagTimeAverages[i] = undefined;
        if (!currentMessageVelocity[i]) currentMessageVelocity[i] = undefined;
      }

      //set state for lag time
      let temp = lagTimeAverages;
      setLiveLagTime((prevState) => {
        const newObject = { ...prevState };
        for (let partition in temp) {
          let array = newObject[partition] || [];
          let updateArray = [...array, temp[partition]];
          if (updateArray.length > 10) {
            updateArray.shift();
          }
          newObject[partition] = updateArray;
        }
        return newObject;
      });

      //set state for velocity
      let temp2 = currentMessageVelocity;
      setMessageVelocity((prevState) => {
        const newObject = { ...prevState };
        for (const key in temp2) {
          let array = newObject[key] || [];
          let updateArray = [...array, temp2[key]];
          if (updateArray.length > 10) {
            updateArray.shift();
          }
          newObject[key] = updateArray;
        }
        return newObject;
      });

      setTime((prevState) => {
        let array = [...prevState, prevState[prevState.length - 1] + 3];
        if (array.length > 10) {
          array.shift();
        }
        return array;
      });

      //reset lag objects
      lagTimesPartitions = {};
      lagTimeAverages = {};
      currentMessageVelocity = {};
    }, 3000);
    // ------------------------------------------ //

    return () => {
      //reset
      clearInterval(intervalId);
      setTime([0]);
      setLiveLagTime({});
      setMessageVelocity({});
      console.log('disconnected');
      socket.close();
    };
  }, []);

  return (
    <div className="graph-page">
      <Link className="back-to-topics" to="/overview">
        ← Back To Topics
      </Link>
      <h2 className="topic-name">{topic.name}</h2>
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
          <MessageVelocity messageVelocity={messageVelocity} time={time} />
        </div>
        <div className="chart-wrapper">
          <LagTimeGraph liveLagTime={liveLagTime} time={time} />
        </div>
      </div>
    </div>
  );
}

export default PartitionGraph;
