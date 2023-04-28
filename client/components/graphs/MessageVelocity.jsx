import { Line } from 'react-chartjs-2';
import React from 'react';

export default function MessageVelocity({ messageVelocity, time }) {

    const colors = [
      'rgba(255, 99, 132)',
      'rgba(54, 162, 235)',
      'rgba(255, 206, 86)',
      'rgba(75, 192, 192)',
      'rgba(153, 102, 255)',
      'rgba(255, 159, 64)',
    ];

  function getDatasets(data, colorPallete) {
    // iterate through liveLagTime
    const datasets = [];

    for (const partition in data) {
      const partitionData = {
        label: partition,
        data: data[partition],
        backgroundColor: colorPallete[partition],
        borderColor: colorPallete[partition],
        borderWidth: 2,
      };
      datasets.push(partitionData);
    }
    // return array of objects
    return datasets;
  }

  const data = {
    // x-axis labels
    labels: time,
    datasets: getDatasets(messageVelocity, colors),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Message Velocity / 3s' },
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Number of Messages',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time from start (s)',
        },
      },
    },
  };

  return <Line data={data} options={options}></Line>;
}
