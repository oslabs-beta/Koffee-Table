import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ClusterOverview({ metadata, brokers }) {
  /*
  {
    "brokers": [
                  {
                    "nodeId":1,
                    "host":"MATT-XPS",
                    "port":9092
                  }
                ],
    "controller":1,
    "clusterId":"9uIFubJvRr-yz1ZqoXvVcA"        
  }
  */

  const { topics } = metadata;
  //   console.log(JSON.stringify(topics));

  /*
  [ 
    {
        "name":"Users",
        "partitions":[ 
                        { 
                            "partitionErrorCode":0,
                            "partitionId":0,
                            "leader":2,
                            "replicas":[2],
                            "isr":[2],
                            "offlineReplicas":[]
                        },
                        {
                            "partitionErrorCode":0,
                            "partitionId":1,
                            "leader":3,
                            "replicas":[3],
                            "isr":[3],
                            "offlineReplicas":[]
                        }
                    ]
    },
    {
        "name":"test-topic2",
        "partitions": [ 
                        { 
                            "partitionErrorCode":0,
                            "partitionId":0,
                            "leader":3,
                            "replicas":[3],
                            "isr":[3],
                            "offlineReplicas":[]
                        }, 
                        { 
                            "partitionErrorCode":0,
                            "partitionId":2,
                            "leader":2,
                            "replicas":[2],
                            "isr":[2],
                            "offlineReplicas":[]
                        },
                        { 
                            "partitionErrorCode":0,
                            "partitionId":1,
                            "leader":1,
                            "replicas":[1],
                            "isr":[1],
                            "offlineReplicas":[]
                        }
                    ]
    }
    ]
  */

  //Total Partitions, use Array.reduce to iterate through each topic and
  const totalPartitions = topics.reduce(
    (accumulator, topic) => accumulator + topic.partitions.length,
    0
  );

  //Brokers: brokers, id, host, port, Controller, Number of Paritions (%of total)
  /*
  {
    "brokers": [
                  {
                    "nodeId":1,
                    "host":"MATT-XPS",
                    "port":9092
                  }
                ],
    "controller":1,
    "clusterId":"9uIFubJvRr-yz1ZqoXvVcA"        
  }
  */
  const { controller } = brokers;
  let brokersList;
  if (brokers) {
    brokersList = brokers.brokers.map((broker) => {
      return (
        <tr>
          <td> {broker.nodeId} </td>
          <td> {broker.host} </td>
          <td> {broker.port} </td>
          <td> {brokers.controller === controller ? 'Yes' : 'No'} </td>
        </tr>
      );
    });
  }

  //Topic: name, partitions, under-replicated paritions
  const topicList = topics.map((topic) => {
    return (
      <tr>
        <td>
          <Link to={`/graphs/${topic.name}`}>{topic.name}</Link>
        </td>
        <td>
          <b>{topic.partitions.length}</b> (
          {Math.floor((topic.partitions.length / totalPartitions) * 100)}%)
        </td>
        <td> 0 </td>
      </tr>
    );
  });

  //total brokers
  //total topics
  //total partitions
  //total under-replicated partitions

  //brokers
  //id
  //host
  //port
  //Controller
  //Number of Paritions (%of total)

  //Topics
  //Name (& search feature for name)
  //Number of paritions
  //Under-replicated
  return (
    <div>
      <h1> Overview </h1>
      <div className="cluster-overview-table">
        <table className="cluster-overview-table table">
          <tbody>
            <tr>
              <td> Total Topics</td>
              <td> {topics.length} </td>
            </tr>
            <tr>
              <td> Total Partitions </td>
              <td> {totalPartitions} </td>
            </tr>
            <tr>
              <td> Total Under-Replicated Partitions </td>
              <td> 0 </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Brokers</h2>
      <div className="cluster-overview-table">
        <table>
          <thead>
            <tr>
              <th>Id </th>
              <th>Host </th>
              <th>Port</th>
              <th>Controller</th>
            </tr>
          </thead>
          <tbody>{brokersList}</tbody>
        </table>
      </div>
      <h2>Topics</h2>
      <div className="cluster-overview-table">
        <table>
          <thead>
            <th>Topic Name</th>
            <th>Number of Partitions (% of Total) </th>
            <th>Number of Under-Replicated Paritions</th>
          </thead>
          {topicList}
        </table>
      </div>
    </div>
  );
}
