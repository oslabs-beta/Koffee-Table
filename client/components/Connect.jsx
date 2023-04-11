import React, { useState, useEffect } from 'react';


function Connect() {
    
    const sendClusterData = () => {
        const hostName = document.querySelector('#hostName').value;
        const port = document.querySelector('#Port').value;

        fetch('/getCluster', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hostname: hostName,
                port: port
            })
        })
        .then((response) => response.json())
        .then((data) => {
            //do important stuff here
            console.log('Here is the Cluster data: ', data)
        })
        .catch((err) => {
            console.log('err in sendClusterData', err);
        })
    }
    
    return(
        <div className="connectCluster">
            <input placeholder='Host Name' className=" input hostName"></input>
            <input placeholder='Port' className=" input Port"></input>
            <button className="btn sendClusterButton" onClick={sendClusterData}>Submit</button>
        </div>
    )
};



export default Connect;