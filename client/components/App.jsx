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
import Login from './userLogin/Login.jsx';
import SignUp from './userLogin/signUp.jsx';
import { io } from 'socket.io-client';

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
  const [userCluster, setUserCluster] = useState({});
  const [consumer, setConsumer] = useState({});
  const [topics, setTopics] = useState([]);
  const [topicPartition, setTopicPartition] = useState([]);
  const [currentTopic, setCurrentTopic] = useState();
  const [messages, setMessages] = useState({});
  const [brokers, setBrokers] = useState(defaultBrokers);
  const [offsets, setOffsets] = useState([
    {
      partition: 0,
      high: 5,
      offset: 0,
      low: 0,
    },
    {
      partition: 1,
      high: 9,
      offset: 0,
      low: 0,
    },
  ]);
  const [userInfo, setUserInfo] = useState([]);
  const [liveLagTime, setLiveLagTime] = useState({});
  const [intervalId, setIntervalId] = useState('');
  const [time, setTime] = useState([0]);

  return (
    <div id="main">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/login"
          element={<Login setUserCluster={setUserCluster} />}
        />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          exact
          path="/connectKafka"
          element={
            <Connect
              setConsumer={setConsumer}
              connected={connected}
              setConnected={setConnected}
              setMetadata={setMetadata}
              setUserInfo={setUserInfo}
              setBrokers={setBrokers}
              setTopics={setTopics}
              userCluster={userCluster}
            />
          }
        />
        <Route
          path="/displayPartition"
          element={
            <BasicClusterInfo
              setTopics={setTopics}
              topics={topics}
              metadata={metadata}
              setBrokers={setBrokers}
              setUserInfo={setUserInfo}
              setCurrentTopic={setCurrentTopic}
            />
          }
        />

        <Route path="/test" element={<Test />} />

        <Route
          path="/messages"
          element={
            <Messages
              topics={topics}
              connected={connected}
              messages={messages}
              setMessages={setMessages}
              userInfo={userInfo}
              currentTopic={currentTopic}
            />
          }
        />
        <Route
          path="/overview"
          element={
            <AllClusterOverview
              metadata={metadata}
              brokers={brokers}
              offsets={offsets}
              setOffsets={setOffsets}
              userInfo={userInfo}
              setTopicPartition={setTopicPartition}
            />
          }
        />
        <Route
          path="/overview/:topicFromURL"
          element={
            <PartitionGraph
              metadata={metadata}
              offsets={offsets}
              topicPartition={topicPartition}
              userInfo={userInfo}
              liveLagTime={liveLagTime}
              setLiveLagTime={setLiveLagTime}
              setIntervalId={setIntervalId}
              intervalId={intervalId}
              time={time}
              setTime={setTime}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
