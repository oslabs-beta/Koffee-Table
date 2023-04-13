import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

function PartitionGraph({ metadata }) {
//   console.log(metadata);
  const data = {
    labels: metadata.topics.map((topic) => topic.name),
    datasets: [
      {
        label: '# of Partitions',
        data: metadata.topics.map((topic) => topic.partitions.length),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = { radius: '50%' };

  return <Pie data={data} options={options} />;
}

export default PartitionGraph;
