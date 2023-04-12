import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Connect from './Connect.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import BasicClusterInfo from './BasicClusterInfo.jsx';
import Test from './Test.jsx';



function App(){
    const [connected, setConnected] = useState(false);
    const [metaData, setMetaData] = useState(null);
    return(
    <div id="main">
        <Navbar />
        <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/connectKafka" element={<Connect connected={connected} setConnected={setConnected} setMetaData={setMetaData}/>}/>
            <Route path="/displayPartition" element={<BasicClusterInfo object={metaData} setMetaData={setMetaData}/>}/>
            <Route path="/test" element={<Test />}/>
        </Routes>
    </div>
    )
}



export default App;