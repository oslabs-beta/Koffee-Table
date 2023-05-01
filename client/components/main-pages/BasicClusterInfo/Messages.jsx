import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

function Messages(props) {
  const { topics, setMessages, userInfo, currentTopic, messages } = props;

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      socket.emit('info-messages', {
        topic: currentTopic,
        userInfo: userInfo,
      });
    });
    socket.on('broadcasting', (message, partition) => {
      console.log('MESSAGE RECEIVED', message, 'on partition', partition);
      setMessages((prevState) => {
        const newObject = { ...prevState }; // deep copy of the state object
        const topicMessages = newObject[partition] || []; // get the messages array for the topic or create a new one
        const updatedTopicMessages = [
          ...topicMessages,
          <div className='message'>{message}</div>,
        ]; // add the new message to the end of the array
        newObject[partition] = updatedTopicMessages; // update the state object with the new messages array
        return newObject; // return the updated state
      });
    });
    return () => {
      console.log('disconnected');
      setMessages({});
      socket.close();
    };
  }, []);

  let display = [];
  for (let i = 0; i < currentTopic.partitions.length; i++) {
    if (messages[i]) {
      display.push(
        <div className='partitionContainer'>
          Partition:
          {i}
          {messages[i]}
        </div>
      );
    }
  }

  return (
    <div>
      <Link className='back-to-topics' to='/displayPartition'>
        ← Back To Topics
      </Link>
      <div id='partitionWrapper'>{display}</div>;
    </div>
  );
}

export default Messages;