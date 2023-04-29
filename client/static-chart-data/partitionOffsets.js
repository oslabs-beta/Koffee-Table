export const partitionOffsetsData = (offsets) => ({
  labels: offsets.map((partition) => partition.partition),
  datasets: [
    {
      // label: offsets.map((partition) => partition.partition),
      data: offsets.map((partition) => partition.high),
      backgroundColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
      ],
      borderColor: [
        'rgba(255, 99, 132)',
        'rgba(54, 162, 235)',
        'rgba(255, 206, 86)',
        'rgba(75, 192, 192)',
        'rgba(153, 102, 255)',
        'rgba(255, 159, 64)',
      ],
      borderWidth: 2,
    },
  ],
});

export const partitionOffsetsOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
