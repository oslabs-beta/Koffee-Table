import React, { useState, useEffect } from 'react';
import Connect from './Connect.jsx';
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





function Navbar() {
  const [connecting, setConnecting] = useState(false);
  const [partitionsDisplay, setPartionsDisplay] = useState(false);
  const [transitTimesDisplay, setTransitTimesDisplay] = useState(false);
  
  const connecter = () => {
    goHome();
    setConnecting(true);
  };

  const displayPartitions = () => {
    goHome();
    setPartionsDisplay(true);
  };

  const displayTransitTime = () => {
    goHome();
    setTransitTimesDisplay(true);
  };

  const goHome = () => {
    setConnecting(false);
    setPartionsDisplay(false);
    setTransitTimesDisplay(false);
  };

  return (
    <div className='wrapper'>
      <div className='navBar'>
      <button className='button homebutton' onClick={goHome}>
         Home
        </button>
        <button className='button connectButton' onClick={connecter}>
          Connect to Kafka Cluster
        </button>
        <button className='button partitionButton' onClick={displayPartitions}>Display Partitions</button>
        <button className='button displayTransitTimeButton' onClick={displayTransitTime}>Display Transit Time</button>
      </div>
      <div className="ConnectToCluster">
        <h1 className='title'>Koffee Table</h1>
        <div>
          {connecting ? <Connect /> : <div></div>}
          {partitionsDisplay ? <BasicClusterInfo object={example}/> : <div></div>}
          {transitTimesDisplay ? <div>TRANSIT TIME</div> : <div></div>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

