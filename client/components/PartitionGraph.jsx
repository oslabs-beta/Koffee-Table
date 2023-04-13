import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function PartitionGraph({ metaData }) {
  console.log(metaData);
  const data = {
    labels: metaData.topics.map((topic) => topic.name),
    // datasets: metadata.topics,
    datasets: [
      {
        label: '# of Partitions',
        data: metaData.topics.map((topic) => topic.partitions.length),
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

  // const options = {
  //   legend: {
  //   display: false
  // }
  // };
  const options2 = { radius: '50%', backgroundColor: 'red' };

  return <Pie data={data} options={options2} />;
}

export default PartitionGraph;
