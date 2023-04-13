import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Messages(props) {
    
    console.log('entering messages.jsx')
    useEffect(() => { 

    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      socket.emit('messages', {topicPartition: props.topicPartition});
    });

    
    socket.on('broadcasting', (message) => {
      console.log('MESSAGE RECEIVED in Messages.jsx', message);
      props.setMessages(oldMessages => [...oldMessages, message]);
    });
}, [])




  let display = [];
  for (let i = 0; i < props.messages.length; i++) {
    display.push(<p>{i}: {props.messages[i]}</p>)
  }
  return (
    <div>
         <p>{props.topicPartition}</p>
        <div>{display}</div>
    </div>
  );
}

export default Messages;
