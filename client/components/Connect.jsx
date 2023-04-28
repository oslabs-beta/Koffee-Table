import React, { useState } from 'react';

function Connect(props) {

  const [clientId, setclientId] = useState(props.userInfo[0]);
  const [hostName, setHostName] = useState(props.userInfo[1]);
  const [port, setPort] = useState(props.userInfo[2]);
  const [conStatus, setConStatus] = useState(["none", "none"]);

  const sendClusterData = () => {
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
          setConStatus(["block", "none"])
          // props.setMetadata(data.topics);
          props.setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++) {
            topicArray.push(data.topics.topics[i]);
          }
          props.setTopics(topicArray);
          props.setConnected(true);
        } else {
          setConStatus(["none", "block"])
          props.setConnected(false);
        }
      })

      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className='connectCluster'>
      {!props.connected ? (
        <div className='connectCluster'>
          <h1>Connect to Kafka Cluster</h1>
          <input placeholder='Client ID' className=' input ClientId' onKeyUp={(v)=>setclientId(v.target.value)}></input>
          <input placeholder='Host Name' className=' input hostName' onKeyUp={(v)=>setHostName(v.target.value)}></input>
          <input placeholder='Port' className=' input Port' onKeyUp={(v)=>setPort(v.target.value)}></input>
          <button
            className='btn btnx sendClusterButton'
            onClick={sendClusterData}
          >
            Submit
          </button>
          {/* checks if user info is in state */}
          {props.userInfo.length ? (
            <button
              className='btn btnx sendUserClusterButton'
              onClick={sendClusterData}
            >
              Connect with User Information
            </button>
          ) : null}
          <p id='connectionStatus' style={{"display": conStatus[0]}}>Connection Failed</p>
          <p id='connectionSuccess' style={{"display": conStatus[1]}}>Connected!</p>
        </div>
      ) : (
        <div>Already Connected</div>
      )}
    </div>
  );
}

export default Connect;
