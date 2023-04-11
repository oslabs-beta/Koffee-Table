import React, { useState, useEffect } from 'react';
// import PartitionGraph from './PartitionGraph.jsx';

function Navbar() {
  const connecter = () => {
    //this is where we run the connect function that the other team has built
    console.log('trying to connect...');
  };

  return (
    <div className='wrapper'>
      <div className='navBar'>
        <button className='button connectButton' onClick={connecter}>
          Connect to Kafka Cluster
        </button>
        <button className='button partitionButton'>Display Partitions</button>
      </div>
      <h1 className='title'>The Kafka Visualizer</h1>
    </div>
  );
}

export default Navbar;
