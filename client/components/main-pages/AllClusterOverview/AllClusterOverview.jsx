import React from 'react';
import OverviewTable from './ClusterOverview/OverviewTable.jsx';
import BrokersTable from './ClusterOverview/BrokersTable.jsx';
import TopicsTable from './ClusterOverview/TopicsTable.jsx';
import AddTopicBtn from './ClusterOverview/AddTopicBtn.jsx'

export default function AllClusterOverview({
  topics,
  brokers,
  offsets,
  setOffsets,
  userInfo,
  setCurrentTopic,
  setTopics
}) {
  return (
    <div className="cluster-overview-wrapper">
      <h1>Kafka Cluster Overview</h1>
      <OverviewTable topics={topics} brokers={brokers} />
      <h2>Brokers</h2>
      <BrokersTable brokers={brokers} />
      <h2>Topics</h2>
      <AddTopicBtn setTopics={setTopics} userInfo={userInfo}/>
      <TopicsTable
        topics={topics}
        setTopics={setTopics}
        offsets={offsets}
        setOffsets={setOffsets}
        userInfo={userInfo}
        setCurrentTopic={setCurrentTopic}
      />
    </div>
  );
}
