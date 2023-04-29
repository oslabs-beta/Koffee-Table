import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

function Navbar(props) {
  return (
    <div className="navBar">
      <Link className="link partitionButton" id="nav-home" to="/">
        <img src={logo} alt="logo" className="logo-nav" />
      </Link>


      {!props.userInfo[3] ? (<Link className="link partitionButton" to="/login">
        Login
      </Link>) : <p className="link linkMessage">Welcome,  {props.userInfo[3]}!</p>}

      <Link className="link displayTransitTimeButton" to="/connect">
        Connect
      </Link>

      <Link className="link displayTransitTimeButton" to="/overview">
        Kafka Cluster Overview
      </Link>

      <Link className="link displayTransitTimeButton" to="/test">
        Test
      </Link>

      <Link className="link displayTransitTimeButton" to="/displayPartition">
        Live Messages
      </Link>
      
    </div>
  );
}

export default Navbar;
