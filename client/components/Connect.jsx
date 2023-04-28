import React, { useState } from 'react';

function Connect(props) {

  const [clientId, setclientId] = useState(null);
  const [hostName, setHostName] = useState(null);
  const [port, setPort] = useState(null);
  const [conStatus, setConStatus] = useState(["none", "none"]);


  const sendClusterData = () => {
    if(!clientId | !hostName | !port) return setConStatus(["none", "block"])

    setConStatus(["none", "none"])
    props.setUserInfo([clientId, hostName, port]);

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
        console.log('this is data', data)
        //do important stuff here
        //error name in obj maight be a problem
        if (!data.err) {
          setConStatus(["block", "none"])
          // props.setMetadata(data.topics);
          props.setBrokers(data.brokers);

          let topicArray = [];
          for (let i = 0; i < data.topics.topics.length; i++){
            topicArray.push(data.topics.topics[i]);
          }
          props.setTopics(topicArray);

        } else {
          setConStatus(["none", "block"])
        }
      })
      .catch((err) => {
        console.log('err in sendClusterData', err);
      });
  };
 

  return (
    <div className="connectCluster">
      <h1>Connect to Kafka Cluster</h1>
      <input placeholder="Client ID" className=" input ClientId" onKeyUp={(v)=>setclientId(v.target.value)}></input>
      <input placeholder="Host Name" className=" input hostName" onKeyUp={(v)=>setHostName(v.target.value)}></input>
      <input placeholder="Port" className=" input Port" onKeyUp={(v)=>setPort(v.target.value)}></input>
        <button className="btn btnx sendClusterButton" onClick={sendClusterData}>
          Submit
        </button>
        {/* checks if user info is in state */}
          {/* {userCluster.port ? (<button className="btn sendUserClusterButton" onClick={sendClusterData}>
          Connect with User Information
        </button>) : null} */}
      <p id="connectionSuccess" style={{"display": conStatus[0]}}>Connected!</p>
      <p id="connectionStatus" style={{"display": conStatus[1]}}>Connection Failed</p>
    </div>
  );
}

export default Connect;
