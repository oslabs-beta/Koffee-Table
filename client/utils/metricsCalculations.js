export function calcLagTimeAverages(averagesList, lagTimesPerPartition) {
  for (const partition in lagTimesPerPartition) {
    let average = 0;
    let lagTimes = lagTimesPerPartition[partition];
    lagTimes.forEach((lag) => {
      average += lag;
    });
    average = average / lagTimesPerPartition[partition].length;
    averagesList[partition] = average;
  }
  return averagesList;
}

export function calcMessageVelocity(velocityList, partitionList) {
  for (const partition in partitionList) {
    velocityList[partition] = partitionList[partition].length;
  }
}

// update live data arrays with interval data
export function populateLiveMetricArrays(prevState, currentAverages) {
  const newMetrics = { ...prevState };
  for (const partition in currentAverages) {
    const currentList = newMetrics[partition] || [];
    const updatedList = [...currentList, currentAverages[partition]];
    // maintain 10 intervals in state
    if (updatedList.length > 10) updatedList.shift();
    newMetrics[partition] = updatedList;
  }
  return newMetrics;
}
