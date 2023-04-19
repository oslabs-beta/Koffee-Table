import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Messages(props) {
  const { topics, connected, setMessages, userInfo, currentTopic, messages } =
    props;

  console.log('message object', messages);
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      socket.emit('messages', {
        topic: currentTopic.name,
        userInfo: userInfo,
      });
    });
    socket.on('broadcasting', (message, partition) => {
      console.log('MESSAGE RECEIVED', message, 'on partition', partition);
      setMessages((prevState) => {
        const newObject = { ...prevState }; // shallow copy the state object
        const topicMessages = newObject[partition] || []; // get the messages array for the topic or create a new one
        const updatedTopicMessages = [...topicMessages, message]; // add the new message to the end of the array
        newObject[partition] = updatedTopicMessages; // update the state object with the new messages array
        return newObject; // return the updated state
      });
    });
    return () => {
      console.log('disconnected');
      setMessages({});
      socket.close()
    }
  }, []);

  let display = [];
  for (let i = 0; i < currentTopic.partitions.length; i++) {
    if (messages[i]){
    let temp = [];
    let values = Object.values(messages);
    for (let j = 0; j < values[i].length; j++) {
      temp.push(<div>{values[i][j]}</div>);
    }
    display.push(
      <div className='partitionCotainer'>
        hey
        {currentTopic.partitions[i].partitionId}
        {temp}
      </div>
    );
    }
  }

  return <div id='partitionWrapper'>{display}</div>;
}

export default Messages;

