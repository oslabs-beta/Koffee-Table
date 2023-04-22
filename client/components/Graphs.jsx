import React, { useState, useEffect } from 'react';
import PartitionGraph from './PartitionGraph.jsx';

//is this page being used?

function Graphs({ metadata }) {
  console.log(metadata);

  return (
    <Routes>
      <Route
        path="/displayPartition/Users"
        element={<PartitionGraph topic={metadata.topics[0]} />}
      />
      {/* const charts = metadata.topics.map((topic) => (

    )); */}
    </Routes>
  );
}

export default Graphs;
