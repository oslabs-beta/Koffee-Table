import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';
import Test from './Test.jsx';
import Messages from './Messages.jsx';
import Graphs from './Graphs.jsx';
import PartitionGraph from './PartitionGraph.jsx';
import ClusterOverview from './ClusterOverview.jsx';

function App() {
  const defaultMetadata = {
    topics: [
      {
        name: 'Users',
        partitions: [
          {
            partitionErrorCode: 0,
            partitionId: 0,
            leader: 2,
            replicas: [2],
            isr: [2],
            offlineReplicas: [],
          },
          {
            partitionErrorCode: 0,
            partitionId: 1,
            leader: 3,
            replicas: [3],
            isr: [3],
            offlineReplicas: [],
          },
        ],
      },
      {
        name: 'test-topic2',
        partitions: [
          {
            partitionErrorCode: 0,
            partitionId: 0,
            leader: 3,
            replicas: [3],
            isr: [3],
            offlineReplicas: [],
          },
          {
            partitionErrorCode: 0,
            partitionId: 2,
            leader: 2,
            replicas: [2],
            isr: [2],
            offlineReplicas: [],
          },
          {
            partitionErrorCode: 0,
            partitionId: 1,
            leader: 1,
            replicas: [1],
            isr: [1],
            offlineReplicas: [],
          },
        ],
      },
    ],
  };

  const [connected, setConnected] = useState(false);
  const [metadata, setMetadata] = useState(defaultMetadata);
  const [consumer, setConsumer] = useState({});
  const [topicPartition, setTopicPartition] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <div id="main">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          exact
          path="/connectKafka"
          element={
            <Connect
              setConsumer={setConsumer}
              connected={connected}
              setConnected={setConnected}
              setMetadata={setMetadata}
            />
          }
        />
        <Route
          path="/displayPartition"
          element={
            <BasicClusterInfo
              setTopicPartition={setTopicPartition}
              metadata={metadata}
            />
          }
        />
        <Route path="/test" element={<Test />} />
        <Route
          path="/messages"
          element={
            <Messages
              topicPartition={topicPartition}
              connected={connected}
              messages={messages}
              setMessages={setMessages}
            />
          }
        />
        <Route
          path="/graphs/:topic"
          element={<PartitionGraph metadata={metadata} />}
        />
        <Route
          path="/overview"
          element={<ClusterOverview metadata={metadata} />}
        />
      </Routes>
    </div>
  );
}

export default App;
