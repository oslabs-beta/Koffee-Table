import React, { useState, useEffect } from 'react';

function Connect(props) {
  const sendClusterData = () => {
    let clientId;
    let hostName;
    let port;
    if (props.userInfo) {
      console.log('here is userInfo: ', props.userInfo);
      clientId = props.userInfo[0];
      hostName = props.userInfo[1];
      port = props.userInfo[2];
    } else {
      hostName = document.querySelector('.hostName').value;
      port = document.querySelector('.Port').value;
      clientId = document.querySelector('.ClientId').value;
      document.querySelector('#connectionStatus').style.display = 'none';
      document.querySelector('#connectionSuccess').style.display = 'none';
      props.setUserInfo([clientId, hostName, port]);
    }
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
        console.log('this is data', data);
        //do important stuff here
        //error name in obj maight be a problem
        if (!data.err) {
          document.querySelector('#connectionSuccess').style.display = 'block';
          // props.setMetadata(data.topics);
          props.setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++) {
            topicArray.push(data.topics.topics[i]);
          }
          props.setTopics(topicArray);
        } else {
          document.querySelector('#connectionStatus').style.display = 'block';
        }
        props.setConnected(true);
      })
      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className="connectCluster">
    {!props.connected ? (<div className="connectCluster">
    <h1>Connect to Kafka Cluster</h1>
    <input placeholder='Client ID' className=' input ClientId'></input>
    <input placeholder='Host Name' className=' input hostName'></input>
    <input placeholder='Port' className=' input Port'></input>
    <button className='btn btnx sendClusterButton' onClick={sendClusterData}>
      Submit
    </button>
    {/* checks if user info is in state */}
    {props.userInfo ? (
      <button className='btn btnx sendUserClusterButton' onClick={sendClusterData}>
        Connect with User Information
      </button>
    ) : null}
    <p id='connectionStatus'>Connection Failed</p>
    <p id='connectionSuccess'>Connected!</p>
  </div>) : <div>Already Connected</div>}
  </div>
  );
}

export default Connect;
