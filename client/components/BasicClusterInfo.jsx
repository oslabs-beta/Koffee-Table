import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

function BasicClusterInfo(props) {
  const { metadata, setTopics, topics, setCurrentTopic } = props;


const renderTopics = [];
if (topics.length === 0){
  renderTopics.push(<p className="topicLink" >Not Connected</p>)
}
else{
  for (let i = 0; i < topics.length; i++){
    renderTopics.push(<Link
                  className="topicLink"
                  to="/messages"
                  onClick={() => setCurrentTopic(topics[i])}
                >
                  <div className="topic">
                  {topics[i].name}
                  </div>
                </Link>
      )
  }
}

return (
  <div className="topicsWrapper" >{renderTopics}</div>
)



  


}

export default BasicClusterInfo;


