import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';
import Test from './Test.jsx';
import Messages from './Messages.jsx';
import Graphs from './Graphs.jsx';
import PartitionGraph from './PartitionGraph.jsx';
import AllClusterOverview from './AllClusterOverview.jsx';
import Login from './userLogin/Login.jsx';
import SignUp from './userLogin/signUp.jsx';
import { io } from 'socket.io-client';

function App() {
  // ML: connect function that connects to consumers and admin following the connect click
  const [connected, setConnected] = useState(false);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState();
  const [messages, setMessages] = useState({});
  const [brokers, setBrokers] = useState(null);
  const [offsets, setOffsets] = useState([]);
  // userInfo: [clientId, hostName, port] -- change to object for Jonas :)
  const [userInfo, setUserInfo] = useState([]);
  const [liveLagTime, setLiveLagTime] = useState({});
  const [messageVelocity, setMessageVelocity] = useState({});
  const [time, setTime] = useState([0]);

  return (
    <div id="main">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Connect
              setConnected={setConnected}
              connected={connected}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setBrokers={setBrokers}
              setTopics={setTopics}
            />
          }
        />
        <Route path="/login" element={<Login setUserInfo={setUserInfo}/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/displayPartition"
          element={
            <BasicClusterInfo
              setTopics={setTopics}
              topics={topics}
              setBrokers={setBrokers}
              setUserInfo={setUserInfo}
              setCurrentTopic={setCurrentTopic}
            />
          }
        />

        <Route path="/test" element={<Test />} />

        <Route
          path="/messages"
          element={
            <Messages
              topics={topics}
              messages={messages}
              setMessages={setMessages}
              userInfo={userInfo}
              currentTopic={currentTopic}
            />
          }
        />
        <Route
          path="/overview"
          element={
            <AllClusterOverview
              topics={topics}
              brokers={brokers}
              offsets={offsets}
              setOffsets={setOffsets}
              userInfo={userInfo}
              setCurrentTopic={setCurrentTopic}
            />
          }
        />
        <Route
          path="/overview/:topicFromURL"
          element={
            <PartitionGraph
              topics={topics}
              offsets={offsets}
              currentTopic={currentTopic}
              userInfo={userInfo}
              liveLagTime={liveLagTime}
              setLiveLagTime={setLiveLagTime}
              setMessageVelocity={setMessageVelocity}
              messageVelocity={messageVelocity}
              time={time}
              setTime={setTime}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
