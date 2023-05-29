import React, { useState, createContext, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
// import Connect from './main-pages/Connect.jsx';
import Navbar from './Navbar.jsx';
// import BasicClusterInfo from './main-pages/BasicClusterInfo/BasicClusterInfo.jsx';
// import Test from './main-pages/Test.jsx';
// import Messages from './main-pages/BasicClusterInfo/Messages.jsx';
// import PartitionGraph from './main-pages/AllClusterOverview/ClusterOverview/PartitionGraph.jsx';
// import AllClusterOverview from './main-pages/AllClusterOverview/AllClusterOverview.jsx';
// import Login from './main-pages/userLogin/Login.jsx';
// import SignUp from './main-pages/userLogin/signUp.jsx';
import Main from './main-pages/Main.jsx';
import '../style.css';

const Connect = lazy(() => import('./main-pages/Connect.jsx'));
const Login = lazy(() => import('./main-pages/userLogin/Login.jsx'));
const SignUp = lazy(() => import('./main-pages/userLogin/signUp.jsx'));
const BasicClusterInfo = lazy(() => import('./main-pages/BasicClusterInfo/BasicClusterInfo.jsx'));
const Test = lazy(() => import('./main-pages/Test.jsx'));
const Messages = lazy(() => import('./main-pages/BasicClusterInfo/Messages.jsx'));
const AllClusterOverview = lazy(() => import('./main-pages/AllClusterOverview/AllClusterOverview.jsx'));
const PartitionGraph = lazy(() => import('./main-pages/AllClusterOverview/ClusterOverview/PartitionGraph.jsx'));

export const UserContext = createContext();

function App() {
  const [connected, setConnected] = useState(false);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState();
  const [messages, setMessages] = useState({});
  const [brokers, setBrokers] = useState(null);
  const [offsets, setOffsets] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [liveLagTime, setLiveLagTime] = useState({});
  const [messageVelocity, setMessageVelocity] = useState({});
  const [time, setTime] = useState([0]);

  return (
    <div id='main'>
      <Navbar userInfo={userInfo} />
      <UserContext.Provider
        value={{
          topics,
          setTopics,
          brokers,
          offsets,
          setOffsets,
          userInfo,
          setCurrentTopic,
        }}
      >
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route
              path='/connect'
              element={
                <Connect
                  setConnected={setConnected}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  connected={connected}
                  setBrokers={setBrokers}
                  setTopics={setTopics}
                />
              }
            />
            <Route
              path='/login'
              element={<Login setUserInfo={setUserInfo} />}
            />
            <Route path='/signUp' element={<SignUp />} />
            <Route
              path='/displayPartition'
              element={
                <BasicClusterInfo
                  topics={topics}
                  setBrokers={setBrokers}
                  setUserInfo={setUserInfo}
                  setCurrentTopic={setCurrentTopic}
                  connected={connected}
                />
              }
            />

            <Route path='/test' element={<Test />} />

            <Route
              path='/messages'
              element={
                <Messages
                  messages={messages}
                  setMessages={setMessages}
                  userInfo={userInfo}
                  currentTopic={currentTopic}
                />
              }
            />
            <Route
              path='/overview'
              element={
                <AllClusterOverview
                // topics={topics}
                // setTopics={setTopics}
                // brokers={brokers}
                // offsets={offsets}
                // setOffsets={setOffsets}
                // userInfo={userInfo}
                // setCurrentTopic={setCurrentTopic}
                />
              }
            />
            <Route
              path='/overview/:topicFromURL'
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
        </Suspense>
      </UserContext.Provider>
    </div>
  );
}

export default App;
