import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';
import Test from './Test.jsx';
import Graphs from './Graphs.jsx';

function App() {
  const [connected, setConnected] = useState(false);
  const [metaData, setMetaData] = useState({
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
  });
  return (
    <div id="main">
      <Navbar />
      <Routes>
        <Route path="/graphs" element={<Main />} />
        <Route
          path="/connectKafka"
          element={
            <Connect
              connected={connected}
              setConnected={setConnected}
              setMetaData={setMetaData}
            />
          }
        />
        <Route
          path="/displayPartition"
          element={
            <BasicClusterInfo object={metaData} setMetaData={setMetaData} />
          }
        />
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Graphs metaData={metaData} />} />
      </Routes>
    </div>
  );
}

export default App;
