import React, { useState, useContext } from 'react';
import { UserContext } from '../App.jsx';

function Connect({
  setConnected,
  connected,
  setBrokers,
  setTopics,
  userInfo,
  setUserInfo,
}) {
  //state for keeping track of input field and feedback message display
  const [clientId, setclientId] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [port, setPort] = useState(null);
  const [conStatus, setConStatus] = useState('none');

  const sendClusterData = (clientIdArg, hostNameArg, portArg) => {
    setConStatus('none');
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
        //check to make sure an error object is not sent back
        if (!data.err) {
          setBrokers(data.brokers);

          //populate topics state
          setTopics(data.topics.topics);

          //populate user info without touching username
          const array = userInfo;
          const args = [clientIdArg, hostNameArg, portArg];
          for (let i = 0; i < 3; i++) {
            array[i] = args[i];
          }
          setUserInfo(array);
          setConnected(true);
        } else {
          //set state of feedback message (connection failed) which will be used to change the CSS on line 100
          setConStatus('block');
          setConnected(false);
        }
      })

      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className='clusterWrapper'>
      {!connected ? (
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
            onClick={() => sendClusterData(clientId, hostName, port)}
          >
            Submit
          </button>
          {/* checks if user info is defined in state */}
          {userInfo.length ? (
            <button
              className='btn btnx sendUserClusterButton'
              onClick={() =>
                sendClusterData(userInfo[0], userInfo[1], userInfo[2])
              }
            >
              Connect with User Information
            </button>
          ) : null}
          <p id='connectionStatus' style={{ display: conStatus }}>
            Connection Failed
          </p>
        </div>
      ) : (
        <div className='form-wrapper' id='connectionSuccess'>
          Connected
        </div>
      )}
    </div>
  );
}

export default Connect;
