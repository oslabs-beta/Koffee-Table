import React from 'react';
import OverviewTable from './ClusterOverview/OverviewTable.jsx';
import BrokersTable from './ClusterOverview/BrokersTable.jsx';
import TopicsTable from './ClusterOverview/TopicsTable.jsx';

export default function AllClusterOverview({
  metadata,
  brokers,
  offsets,
  setOffsets,
  userInfo,
  setTopicPartition,
}) {
  return (
    <div id="clusterWrapper">
      <h1>Kafka Cluster Overview</h1>
      <OverviewTable metadata={metadata} brokers={brokers} />
      <h2>Brokers</h2>
      <BrokersTable brokers={brokers} />
      <h2>Topics</h2>
      <TopicsTable 
        metadata={metadata}
        offsets={offsets}
        setOffsets={setOffsets}
        userInfo={userInfo}
        setTopicPartition={setTopicPartition}
      />
    </div>
  );
}
