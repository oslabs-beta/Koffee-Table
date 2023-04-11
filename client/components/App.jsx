import React, { useState, useEffect } from 'react';
import '../style.css';
import Main from './Main.jsx';
import Test from './Test.jsx';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';


function App(){
    const [connected, setConnected] = useState(false);
    return(
        <Routes>
            <Route path="/" element={<Main connected={connected} setConnected={setConnected}/>}/>
            <Route path="/test" element={<Test />}/>
        </Routes>
        
        
    )
}



export default App;