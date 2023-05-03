import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../imgs/logo.png';

function Navbar({userInfo}) {
  return (
    <div className="navBar">
      <Link className="link partitionButton" id="nav-home" to="/">
        <img src={logo} alt="logo" className="logo-nav" />
      </Link>

      {/* no longer renders option to login if user is already logged in - userInfo[3] is username*/}
      {!userInfo[3] ? (
        <Link className="link partitionButton" to="/login">
          Login
        </Link>
      ) : (
        <p className="link linkMessage">Welcome, {userInfo[3]}!</p>
      )}

      <Link className="link" to="/connect">
        Connect
      </Link>

      <Link className="link" to="/overview">
        Kafka Cluster Overview
      </Link>

      <Link className="link" to="/displayPartition">
        Live Messages
      </Link>
        
      {/* <Link className="link" to="/test">
        Test
      </Link> */}
    </div>
  );
}

export default Navbar;
