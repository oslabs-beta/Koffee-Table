export const partitionLagTimes = (lagTimes) => ({
  labels: lagTimes.map((partition) => partition.partition),
  datasets: [
    {
      // label: offsets.map((partition) => partition.partition),
      data: lagTimes.map((partition) => partition.high),
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

export const partitionLagTimesOptions = {
  responsive: true,
  plugins: {
    title: { display: true, text: 'Partition Lag Times' },
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
