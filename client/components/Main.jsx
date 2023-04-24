import React, { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Connect from './Connect.jsx';
import logo from '../imgs/logo.png';

function Main({ setUserInfo, setBrokers, setTopics }) {
  return (
    <div className="main">
      {/* <h1 id="title">Koffee Table</h1> */}
      <img src={logo} alt="logo" className="logo" />
      <div className="connect">
        <Connect
          setUserInfo={setUserInfo}
          setBrokers={setBrokers}
          setTopics={setTopics}
        />
      </div>
    </div>
  );
}

export default Main;
