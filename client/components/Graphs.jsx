import React, { useState, useEffect } from 'react';
import PartitionGraph from './PartitionGraph.jsx';

function Graphs({ metadata }) {
  return (
    <div className='pieChart'>
      <PartitionGraph metadata={metadata} />
    </div>
  );
}

export default Graphs;
