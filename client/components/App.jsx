import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';


const example = {
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

function App(){
    const [connected, setConnected] = useState(false);
    return(
    <div id="main">
        <Navbar />
        <Routes>
            <Route path="/Home" element={<Main />}/>
            <Route path="/connectKafka" element={<Connect />}/>
            <Route path="/displayPartition" element={<BasicClusterInfo object={example}/>}/>
        </Routes>
    </div>
    )
}



export default App;