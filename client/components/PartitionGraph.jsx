import React from 'react';
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
import { Pie, Bar } from 'react-chartjs-2';
import {
  partitionReplicasData,
  partitionReplicasOptions,
} from '../chart-data/partitionReplicas';
import {
  partitionOffsetsData,
  partitionOffsetsOptions,
} from '../chart-data/partitionOffsets';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  CategoryScale,
  BarElement
);

function PartitionGraph({ metadata, offsets }) {
  console.log(offsets);
  const { topicFromURL } = useParams();
  // console.log(topicFromUrl);
  const topic = metadata.topics.filter(
    (topic) => topic.name === topicFromURL
  )[0];

  return (
    <div>
      <h2>{topic.name}</h2>
      <div className="chart-layout">
        <Pie
          data={partitionReplicasData(topic)}
          options={partitionReplicasOptions}
        />
        <Bar
          data={partitionOffsetsData(offsets)}
          options={partitionOffsetsOptions}
        />
      </div>
    </div>
  );
}

export default PartitionGraph;
