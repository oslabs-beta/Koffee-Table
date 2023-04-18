import React, { useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";


function Navbar() {

  return (
    <div className='navBar'>

        <Link className='link partitionButton' to="/">Home</Link>

        <Link className='link partitionButton' to="/login">Login</Link>

        <Link className='link displayTransitTimeButton' to="/connectKafka">Connect to Kafka Cluster</Link>

        <Link className="link displayTransitTimeButton" to="/overview">Kafka Cluster Overview</Link>

        <Link className='link displayTransitTimeButton' to="/displayPartition">Partitions</Link>

        <Link className="link displayTransitTimeButton" to="/graphs">Graphs</Link>

        <Link className='link testPage' to="/test">Test-Tool</Link>
    </div>
  );
}

export default Navbar;

