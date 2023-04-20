import { Line } from 'react-chartjs-2';
import React from 'react';

export default function LagTimeGraph({ liveLagTime, time }) {
  /* liveLagTime: 
        {
            0: [4, 5, 4] 
            1: [6.33, 3, 2]
        }, 
    */

  console.log('liveLagTime', liveLagTime);

  function getDatasets(data) {
    // iterate through liveLagTime
    const datasets = [];

    for (const partition in data) {
      const partitionData = {
        label: partition,
        data: data[partition],
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
      };
      datasets.push(partitionData);
    }
    // return array of objects
    return datasets;
  }

  // populate new object with values for each partition
  // {0: [4, 5], 1: [6.33, 4]}

  const data = {
    // x-axis labels
    labels: time,
    datasets: getDatasets(liveLagTime),
  };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Lag Time/15s' },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Lag Time (ms)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
    },
  };

  return <Line data={data} options={options}></Line>;
}
