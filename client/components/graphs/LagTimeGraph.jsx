import { Line } from 'react-chartjs-2';
import React from 'react';

export default function LagTimeGraph({ liveLagTime }) {
  /* liveLagTime: 
        {
            0: [4, 5, 4] 
            1: [6.33, 3, 2]
        }, 
    */

  console.log('liveLagTime', liveLagTime);

  // function getDatasets
  // function getDatasets(liveLagTime) {
  //   // iterate through liveLagTime

  //   const datasets = liveLagTime.map(lagTimes => {
  //     {
  //       data: [lagTimes]
  //     }
  //   })
  //   // return array of objects
  // }

  // populate new object with values for each partition
  // {0: [4, 5], 1: [6.33, 4]}

  const data = {
    labels: [0, 1, 2, 3],
    datasets: [
      {
        // label: offsets.map((partition) => partition.partition),
        // data: offsets.map((partition) => partition.high),
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

  return <p>hi</p>;
}
