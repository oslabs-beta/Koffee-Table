<p align="center">
  <img src="https://user-images.githubusercontent.com/9859351/235711102-554a69eb-5607-4c4b-8c34-20c54943982e.png" />
</p>

# KoffeeTable
KoffeeTable is a containerized Kafka visualization tool which allows developers to connect their running Kafka cluster and visualize both static and live data. There are a vast array of metrics that can be monitored to ensure efficiency of data pipelines using Kafka, however, it can be difficult to know which metrics are important and visualize these metrics in an intuitive way. KoffeeTable highlights 4 important metrics for Kafka cluster topics, including partition replicas, partition offsets, average lag time, and message velocity. It also displays messages in real-time as they are consumed.

# Table of Contents
- [Setup](#set-up)
- [Connecting your cluster](#connecting-your-cluster)
- [Using KoffeeTable](#using-koffeetable)
- [Helpful documentation](#helpful-documentation)
- [Open Source Information](#open-source-information)
- [Changelog](#changelog)
- [License Information](#license-information)
- [Contributor Information](#contributor-information)

# Set up
In order to use KoffeeTable, you will first need to be running your Kafka cluster in a Docker container. Then, in a terminal, run the Docker image:
<br />
`docker run -p 3000:3000 -p 3001:3001 koffeetable/kafka-visualizer`

# Connecting your cluster
1. Navigate to `localhost:3000` to view the application.
2. Click on "Connect" to connect your Kafka cluster by entering its client ID, host name, and port name.
<img width="800" alt="connect" src="https://user-images.githubusercontent.com/9859351/235729811-2dc16aaf-30c4-435c-9fa0-d58cbf7ed46e.png">
3. Optionally, you can also click "Login" to either login or sign up with your connection credentials to have these, along with your username and password, saved.
<img width="800" alt="login" src="https://user-images.githubusercontent.com/9859351/235729843-2d074d00-2c6f-4028-94f5-7fbf6289f927.png">

# Using KoffeeTable
- After connecting, click on "Kafka Cluster Overview" to view metadata on your current connected cluster. <img width="800" alt="overview" src="https://user-images.githubusercontent.com/9859351/235729949-16e6cf06-2d5a-4496-a130-a845b3e00e58.png">
  - Under "Topics":
    - Click the the dropdown arrow to view partition data for the selected topic.
    - Click the link of a topic name to view metrics visualizations for the selected topic. <img width="800" alt="graphs" src="https://user-images.githubusercontent.com/9859351/235730053-b365a8ef-e09d-4d5e-9098-8b34beada376.png">
    - You can also add topics to your cluster by clicking the "Add Topic" button and remove existing topics by clicking the delete icons next to each topic. 
- Navigate to "Live Messages" and select a topic to view messages consumed per partition.
- Navigate to "Test" to send a sample set of data to your cluster.
  - Entering values in "how many inputs" and "delay in ms" and clicking "Start data flow" will send a set number of inputs at a set interval to your selected topic.
  - Clicking "Start listening" will begin listening for keyboard key inputs and send keyboard input data to your selected topic.

# Helpful documentation
- https://kafka.apache.org/documentation/
- https://kafka.js.org/docs/getting-started
- https://docs.docker.com/

# Open Source Information
- Running the application in dev mode: `npm run dev`
- Running tests: `npm run test`
- We encourage you to submit issues for any bugs or ideas for enhancements. Please feel free to fork this repo and submit pull requests to contribute as well. Also follow KoffeeTable on LinkedIn for more updates. Some ideas for future contributions include:
  - Migrating codebase to TypeScript
  - Incorporating additional metrics from monitoring systems like Grafana and Prometheus
  - More thorough unit and integration testing

# Changelog
- v1.0: initial release May 3, 2023

# Contributor Information
- Joe Ostrow https://github.com/JSTRO
- Jonas Gantar https://github.com/TJonasT
- Jonathan Valdes https://github.com/jonathanvaldes57
- Matthew Lee https://github.com/Mattholee
- Gavin Briggs-Perez https://github.com/gavinBP

# License Information
This project is licensed under the MIT License - see the LICENSE.md file for details


