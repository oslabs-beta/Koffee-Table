export const partitionReplicasData = (topic) => ({
  labels: topic.partitions.map((partition) => partition.partitionId),
  datasets: [
    {
      // label: topic.partitions.map((partition) => partition.partitionId),
      data: topic.partitions.map((partition) => partition.replicas[0]),
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

export const partitionReplicasOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: { display: true, text: 'Partition Replicas' },
  },
};
