import React from 'react';
import { Link } from 'react-router-dom';

function BasicClusterInfo({ connected, topics, setCurrentTopic }) {
  const renderTopics = [];
  if (!connected) {
    renderTopics.push(<p className="topicLink">Not Connected</p>);
  } else {
    for (let i = 0; i < topics.length; i++) {
      renderTopics.push(
        <Link
          className="topicLink"
          to="/messages"
          onClick={() => setCurrentTopic(topics[i])}
        >
          <div className="topic">{topics[i].name}</div>
        </Link>
      );
    }
  }

  return (
    <div className="topicsWrapper form-wrapper">
      {connected ? <h1>Choose a Topic</h1> : null}
      {renderTopics}
    </div>
  );
}

export default BasicClusterInfo;
