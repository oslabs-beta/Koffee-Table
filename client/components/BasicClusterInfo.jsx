import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function BasicClusterInfo(props) {
  const { metadata, setTopics, topics, setCurrentTopic } = props;

  let connected = false;
  const renderTopics = [];
  if (topics.length === 0) {
    renderTopics.push(<p className='topicLink'>Not Connected</p>);
  } else {
    connected = true;
    for (let i = 0; i < topics.length; i++) {
      // console.log(
      //   'here topics: ',
      //   topics,
      //   ' and here is topics[i]: ',
      //   topics[i]
      // );
      renderTopics.push(
        <Link
          className='topicLink'
          to='/messages'
          onClick={() => setCurrentTopic(topics[i])}
        >
          <div className='topic'>{topics[i].name}</div>
        </Link>
      );
    }
  }

  return (
    <div className='topicsWrapper'>
      {connected ? <h1>Choose a Topic</h1> : null}
      {renderTopics}
    </div>
  );
}

export default BasicClusterInfo;
