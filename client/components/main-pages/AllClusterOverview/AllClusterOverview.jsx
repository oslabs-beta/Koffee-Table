import React from 'react';
import OverviewTable from './ClusterOverview/OverviewTable.jsx';
import BrokersTable from './ClusterOverview/BrokersTable.jsx';
import TopicsTable from './ClusterOverview/TopicsTable.jsx';
import AddTopicBtn from './ClusterOverview/AddTopicBtn.jsx';

export default function AllClusterOverview() {
  return (
    <div className='cluster-overview-wrapper'>
      <h1>Kafka Cluster Overview</h1>
      <OverviewTable />
      <h2>Brokers</h2>
      <BrokersTable />
      <h2>Topics</h2>
      <AddTopicBtn />
      <TopicsTable/>
    </div>
  );
}
