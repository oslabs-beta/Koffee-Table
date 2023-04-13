import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';
import Test from './Test.jsx';
import Messages from './Messages.jsx';

function App() {
  const [connected, setConnected] = useState(false);
  const [metaData, setMetaData] = useState(null);
  const [consumer, setConsumer] = useState({});
  const [topicPartition, setTopicPartition] = useState([]);
  const [messages, setMessages] = useState([]);

  return (
    <div id='main'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route
          path='/connectKafka'
          element={
            <Connect
              setConsumer={setConsumer}
              connected={connected}
              setConnected={setConnected}
              setMetaData={setMetaData}
            />
          }
        />
        <Route
          path='/displayPartition'
          element={
            <BasicClusterInfo setTopicPartition={setTopicPartition} object={metaData} setMetaData={setMetaData} />
          }
        />
        <Route path='/test' element={<Test />} />
        <Route path='/messages' element={<Messages topicPartition={topicPartition} connected={connected} messages={messages} setMessages={setMessages}/>} />
      </Routes>
    </div>
  );
}

export default App;
