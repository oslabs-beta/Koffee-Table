import React, { useState } from 'react';

function Connect(props) {
  const [clientId, setclientId] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [port, setPort] = useState(null);
  const [conStatus, setConStatus] = useState(['none', 'none']);

  const {
    setConnected,
    connected,
    userInfo,
    setUserInfo,
    setBrokers,
    setTopics,
  } = props;

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
          setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++) {
            topicArray.push(data.topics.topics[i]);
          }
          setUserInfo([clientId, hostName, port]);
          setTopics(topicArray);
          setConnected(true);
        } else {
          setConStatus(['none', 'block']);
          setConnected(false);
        }
      })

      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };

  return (
    <div className="clusterWrapper">
      {!connected ? (
        <div className="connectCluster">
          <h1>Connect to Kafka Cluster</h1>
          <input
            placeholder="Client ID"
            className=" input ClientId"
            onKeyUp={(v) => setclientId(v.target.value)}
          ></input>
          <input
            placeholder="Host Name"
            className=" input hostName"
            onKeyUp={(v) => setHostName(v.target.value)}
          ></input>
          <input
            placeholder="Port"
            className=" input Port"
            onKeyUp={(v) => setPort(v.target.value)}
          ></input>
          <button
            className="btn btnx sendClusterButton"
            onClick={() => sendClusterData(clientId, hostName, port)}
          >
            Submit
          </button>
          {/* checks if user info is in state */}
          {userInfo.length ? (
            <button
              className="btn btnx sendUserClusterButton"
              onClick={() =>
                sendClusterData(userInfo[0], userInfo[1], userInfo[2])
              }
            >
              Connect with User Information
            </button>
          ) : null}
          <p id="connectionStatus" style={{ display: conStatus[0] }}>
            Connection Failed
          </p>
          <p id="connectionSuccess" style={{ display: conStatus[1] }}>
            Connected!
          </p>
        </div>
      ) : (
        <div className="form-wrapper" id="connectionSuccess">
          Connected
        </div>
      )}
    </div>
  );
}

export default Connect;
