import React, { useState, useEffect } from 'react';
import PartitionGraph from './PartitionGraph.jsx';

function Graphs({ metaData }) {
  return (
    <div className="pieChart">
      <PartitionGraph metaData={metaData} />
    </div>
  );
}

export default Graphs;
