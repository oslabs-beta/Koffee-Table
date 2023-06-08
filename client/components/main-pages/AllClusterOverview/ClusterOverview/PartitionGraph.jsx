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
import {
  calcLagTimeAverages,
  calcMessageVelocity,
  populateLiveMetricArrays,
} from '../../../../utils/metricsCalculations';

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
      console.log(`PartitionGraph: You connected with id: ${socket.id}`);
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
      // if (lagTime > 100) {
      //   lagTime = 0;
      // }
      // build out object for lagtimes per partition {0: [], 1: [3, 6, 7], 2: }
      if (!lagTimesPartitions[partition])
        lagTimesPartitions[partition] = [lagTime];
      else lagTimesPartitions[partition].push(lagTime);
    });

    // interval every 3 seconds to update lag time and velocity
    const intervalId = setInterval(() => {
      let lagTimeAveragesInterval = lagTimeAverages;
      let currentMessageVelocityInterval = currentMessageVelocity;

      // calculate averages and velocity
      calcLagTimeAverages(lagTimeAverages, lagTimesPartitions);
      calcMessageVelocity(currentMessageVelocity, lagTimesPartitions);

      //add undefined to partitions with no messages in the current interval
      for (let i = 0; i < currentTopic.partitions.length; i++) {
        if (!lagTimeAverages[i]) lagTimeAverages[i] = undefined;
        if (!currentMessageVelocity[i]) currentMessageVelocity[i] = undefined;
      }

      //set state for lag time and velocity
      setLiveLagTime((prevState) =>
        populateLiveMetricArrays(prevState, lagTimeAveragesInterval)
      );
      setMessageVelocity((prevState) =>
        populateLiveMetricArrays(prevState, currentMessageVelocityInterval)
      );

      // set current time interval from start
      setTime((prevState) => {
        let times = [...prevState, prevState[prevState.length - 1] + 3];
        if (times.length > 10) {
          times.shift();
        }
        return times;
      });

      // reset metrics at end of interval
      lagTimesPartitions = {};
      lagTimeAverages = {};
      currentMessageVelocity = {};
    }, 3000);
    // ------------------------------------------ //

    return () => {
      // reset state and close socket connection
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
