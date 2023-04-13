import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navBar">
      <Link className="link partitionButton" to="/">
        Home
      </Link>

      <Link className="link displayTransitTimeButton" to="/connectKafka">
        Connect to Kafka Cluster
      </Link>

      <Link className="link displayTransitTimeButton" to="/displayPartition">
        Partitions
      </Link>

      <Link className="link displayTransitTimeButton" to="/graphs">
        Graphs
      </Link>
    </div>
  );
}

export default Navbar;
