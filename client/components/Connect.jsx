import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function Connect({ setUserInfo, setBrokers, setTopics }) {
  const sendClusterData = () => {
    const hostName = document.querySelector('.hostName').value;
    const port = document.querySelector('.Port').value;
    const clientId = document.querySelector('.ClientId').value;
    document.querySelector('#connectionStatus').style.display = 'none';
    document.querySelector('#connectionSuccess').style.display = 'none';
    setUserInfo([clientId, hostName, port]);

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
          setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++) {
            topicArray.push(data.topics.topics[i]);
          }
          setTopics(topicArray);
        } else {
          document.querySelector('#connectionStatus').style.display = 'block';
        }
      })
      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className="form-wrapper">
      {/* <Form> */}
      <h1>Connect to Kafka Cluster</h1>
      <input
        placeholder="Client ID"
        className=" input ClientId input-wrapper"
      ></input>
      <input
        placeholder="Host Name"
        className=" input hostName input-wrapper"
      ></input>
      <input placeholder="Port" className=" input Port input-wrapper"></input>
      <button
        className="btn btnx sendClusterButton"
        onClick={sendClusterData}
        y
      >
        Submit
      </button>
      {/* checks if user info is in state */}
      {/* {userCluster.port ? (<button className="btn sendUserClusterButton" onClick={sendClusterData}>
          Connect with User Information
        </button>) : null} */}
      <p id="connectionStatus">Connection Failed</p>
      <p id="connectionSuccess">Connected!</p>
      {/* </Form> */}
    </div>
  );
}

export default Connect;
