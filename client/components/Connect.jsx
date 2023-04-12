import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Connect(props) {
  const socket = io('http://localhost:3001');
  socket.on('connect', () => {
    console.log(`You connected with id: ${socket.id}`);
    socket.emit('test-event', 'finally all g');
  });

  socket.on('broadcasting', (message) => {
    console.log('MESSAGE RECEIVED BY CLIENT', message);
  });

  const sendClusterData = () => {
    const hostName = document.querySelector('.hostName').value;
    const port = document.querySelector('.Port').value;
    const clientId = document.querySelector('.ClientId').value;
    document.querySelector('#connectionStatus').style.display = 'none';
    document.querySelector('#connectionSuccess').style.display = 'none';

    fetch('/getCluster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientId,
        hostName: hostName,
        port: port,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        //do important stuff here
        //error name in obj maight be a problem
        if (!data.err) {
          document.querySelector('#connectionSuccess').style.display = 'block';
          props.setMetaData(data);
          props.setConnected(true);
        } else {
          document.querySelector('#connectionStatus').style.display = 'block';
        }
      })
      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className="connectCluster">
      <input placeholder="Client ID" className=" input ClientId"></input>
      <input placeholder="Host Name" className=" input hostName"></input>
      <input placeholder="Port" className=" input Port"></input>
      <button className="btn sendClusterButton" onClick={sendClusterData}>
        Submit
      </button>
      <p id="connectionStatus">Connection Failed</p>
      <p id="connectionSuccess">Connected!</p>
    </div>
  );
}

export default Connect;
