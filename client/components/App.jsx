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
import AllClusterOverview from './AllClusterOverview.jsx';

function App() {
  const defaultMetadata = {
    topics: [
      {
        name: 'Test Topic 1',
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
        name: 'Test Topic 2',
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

  const defaultBrokers = {
    brokers: [
      {
        nodeId: 1,
        host: 'Your host name',
        port: 9092,
      },
    ],
    controller: 1,
  };

  const [connected, setConnected] = useState(false);
  const [metadata, setMetadata] = useState(defaultMetadata);
  const [consumer, setConsumer] = useState({});
  const [topicPartition, setTopicPartition] = useState([]);
  const [messages, setMessages] = useState([]);
  const [brokers, setBrokers] = useState(defaultBrokers);
  const [offsets, setOffsets] = useState([
    {
      id: 0,
      messages: 0,
      offset: 0,
    },
  ]);
  const [userInfo, setUserInfo] = useState([])

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
              setBrokers={setBrokers}
              setUserInfo={setUserInfo}

            />
          }
        />
        <Route path="/test" element={<Test />} />

        <Route
          path="/messages"
          element={
            <BasicClusterInfo
              setTopicPartition={setTopicPartition}
              object={metadata}
              setMetadata={setMetadata}
            />
          }
        />
        <Route path='/test' element={<Test />} />

        <Route path='/messages' element={<Messages topicPartition={topicPartition} connected={connected} messages={messages} setMessages={setMessages} userInfo={userInfo}/>} />
        <Route
          path='/overview'
          element={<AllClusterOverview metadata={metadata} brokers={brokers} offsets={offsets} setOffsets={setOffsets}/>}
        />
      </Routes>
      <Route
          path="/graphs/:topic"
          element={<PartitionGraph metadata={metadata} />}
        />
    </div>
  );
}

export default App;
