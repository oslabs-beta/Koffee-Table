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

function PartitionGraph({ metadata }) {
  const { topicFromUrl } = useParams();
  const topic = metadata.topics.filter((topic) => topic.name === 'Users')[0];

  return (
    <div className="chart-layout">
      <Pie
        data={partitionReplicasData(topic)}
        options={partitionReplicasOptions}
      />
      <Bar
        data={partitionOffsetsData(topic)}
        options={partitionOffsetsOptions}
      />
    </div>
  );
}

export default PartitionGraph;
