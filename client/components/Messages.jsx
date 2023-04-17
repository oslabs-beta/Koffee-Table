import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';



function Messages(props) {
  const { topicPartition, connected, messages, setMessages, userInfo } = props;

  console.log('message object', messages);
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log(`You connected with id: ${socket.id}`);
      socket.emit('messages', {
        topicPartition: topicPartition,
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
      socket.close()
    }
  }, []);



  // socket.on('broadcasting', (message) => {
  //   console.log('MESSAGE RECEIVED', message);
  //   if (messages[topicPartition[1]]) {
  //     console.log('it exists');
  //     setMessages((prevState) => {
  //       const newObject = Object.assign({}, prevState);
  //       newObject[topicPartition[1]] = [...newObject[topicPartition[1]], message]
  //       return newObject;
  //   });
  //   }
  //   else{
  //     console.log('it does not exist');
  //     setMessages((prevState) => {
  //     const newObject = Object.assign({}, prevState);
  //     // console.log('here is newObject: ', prevState)
  //     newObject[topicPartition[1]] = [message];
  //     return newObject;
  //   });
  //   }
  // });

  let display = [];
  if (messages[topicPartition[1]]) {
    //messages already exist and are ready to be pushed into display
    for (let i = 0; i < messages[topicPartition[1]].length; i++) {
      display.push(
        <p>
          {i}: {messages[topicPartition[1]][i]}
        </p>
      );
    }
  } else {
    //no messages to push into display from messages
    display.push(<p>No messages</p>);
  }
  // socket.close();
  // console.log('socket has been closed');
 
  return (
    <div>
      <p>{topicPartition}</p>
      <div>{display}</div>
    </div>
  );
}

export default Messages;
