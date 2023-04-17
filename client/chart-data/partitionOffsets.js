export const partitionOffsetsData = (offsets) => ({
  labels: offsets.map((partition) => partition.partition),
  datasets: [
    {
      label: offsets.map((partition) => partition.partition),
      data: offsets.map((partition) => partition.high),
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
});

export const partitionOffsetsOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: 'Partition Offsets' },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: '# of messages',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Partition ID',
      },
    },
  },
};
