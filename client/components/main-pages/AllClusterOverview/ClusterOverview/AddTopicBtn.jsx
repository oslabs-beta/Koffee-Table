import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';

export default function AddTopicBtn({ setTopics, userInfo }) {
  const [open, setOpen] = useState(false);
  const [topicName, setTopicName] = useState('');
  const [partitionNum, setPartitionNum] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the second value is a positive integer
    const isPositiveInteger = /^[1-9]\d*$/.test(partitionNum);
    if (!isPositiveInteger) {
      // Display an error message or do something else to indicate that the value is invalid
      setError('Please enter a positive integer');
      return;
    }
    setError('');
    fetch('/createTopic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: userInfo[0],
        hostName: userInfo[1],
        port: userInfo[2],
        topic: topicName,
        partitionNum: partitionNum,
      }),
    })
      .then((res) => res.json())
      .then((updatedTopics) => {
        let topicArray = [];
        for (let i = 0; i < updatedTopics.topics.length; i++) {
          topicArray.push(updatedTopics.topics[i]);
        }
        setTopics(topicArray);
        setOpen(false);
      })
  };

  return (
    <div id='add-topics'>
      <Button variant='outlined' id='add-topics-btn' onClick={() => setOpen(true)}>
        + Add a New Topic
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter a topic name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a topic name below:
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            label='Topic'
            type='text'
            fullWidth
            value={topicName}
            onChange={(event) => setTopicName(event.target.value)}
          />
          <DialogContentText>
            How many partitions should this topic should have?
          </DialogContentText>
          <TextField
            error={error !== ''}
            helperText={error}
            InputProps={{ inputProps: { min: 1 } }}
            margin='dense'
            label='Partition'
            type='text'
            fullWidth
            value={partitionNum}
            onChange={(event) => setPartitionNum(event.target.value)}
          />
        </DialogContent>
        <Button onClick={handleSubmit} color='primary'>
          Submit
        </Button>
      </Dialog>
    </div>
  );
}
