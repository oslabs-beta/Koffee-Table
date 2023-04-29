import React, { useState } from 'react';

function Connect(props) {
  const [clientId, setclientId] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [port, setPort] = useState(null);
  const [conStatus, setConStatus] = useState(['none', 'none']);
  const sendClusterData = (clientIdArg, hostNameArg, portArg) => {

    fetch('/getCluster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: clientIdArg,
        hostName: hostNameArg,
        port: portArg,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('this is data', data);
        //do important stuff here
        //error name in obj maight be a problem
        if (!data.err) {
          setConStatus(['block', 'none']);
          // props.setMetadata(data.topics);
          props.setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++) {
            topicArray.push(data.topics.topics[i]);
          }
          if (!props.userInfo.length){
            props.setUserInfo([clientId, hostName, port])
          }
          props.setTopics(topicArray);
          props.setConnected(true);
        } else {
          setConStatus(['none', 'block']);
          props.setConnected(false);
        }
      })

      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className='clusterWrapper'>
      {!props.connected ? (
        <div className='connectCluster'>
          <h1>Connect to Kafka Cluster</h1>
          <input
            placeholder='Client ID'
            className=' input ClientId'
            onKeyUp={(v) => setclientId(v.target.value)}
          ></input>
          <input
            placeholder='Host Name'
            className=' input hostName'
            onKeyUp={(v) => setHostName(v.target.value)}
          ></input>
          <input
            placeholder='Port'
            className=' input Port'
            onKeyUp={(v) => setPort(v.target.value)}
          ></input>
        <button
            className='btn btnx sendClusterButton'
            onClick={()=>sendClusterData(clientId, hostName, port)}
          >
          Submit
        </button>
        {/* checks if user info is in state */}
      {props.userInfo.length ? (
            <button
              className='btn btnx sendUserClusterButton'
              onClick={() => sendClusterData(props.userInfo[0],props.userInfo[1],props.userInfo[2])}
            >
              Connect with User Information
            </button>
          ) : null}
          <p id='connectionStatus' style={{ display: conStatus[0] }}>
            Connection Failed
          </p>
          <p id='connectionSuccess' style={{ display: conStatus[1] }}>
            Connected!
          </p>
        </div>
      ) : (
        <div>Already Connected</div>
      )}
    </div>
  );
}

export default Connect;
