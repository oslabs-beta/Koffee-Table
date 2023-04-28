<!-- ![FullLogo_Transparent](https://user-images.githubusercontent.com/9859351/235244153-ff9400d7-db60-40ec-a070-48774a6ec02d.png) -->
# KoffeeTable
KoffeeTable is a containerized Kafka visualization tool which allows developers to connect their running Kafka cluster and visualize both static and live data. There are a vast array of metrics that can be monitored to ensure efficiency of data pipelines using Kafka, however, it can be difficult to know which metrics are important and visualize these metrics in an intuitive way. KoffeeTable highlights 4 important metrics for Kafka cluster topics, including partition replicas, partition offsets, average lag time, and message velocity. It also displays messages in real-time as they are consumed.

# Table of Contents
- [Setup](#set-up)
- [Using KoffeeTable](#using-koffeetable)
- [Usage Guidelines](#usage-guidelines)
- [Helpful documentation](#helpful-documentation)
- [Demo](#demo)
- [Open Source Information](#open-source-information)
- [Changelog](#changelog)
- [License Information](#license-information)
- [Contributor Information](#contributor-information)

# Set up
In order to use KoffeeTable, you will first need to be running your Kafka cluster in a Docker container.
1. Pull the KoffeeTable image from DockerHub: 
`docker image pull koffeetable`
3. Run the image:
`docker run koffeetable`

# Using KoffeeTable
1. Navigate to port 3000 to view the homepage.
2. Connect your Kafka cluster by entering its client ID, host name, and port name.

# Usage Guidelines

# Helpful documentation
- https://docs.docker.com/
- https://kafka.apache.org/documentation/
- https://kafka.js.org/docs/getting-started

# Demo

# Open Source Information
- Running the application in dev mode: 'npm run dev`
- Running tests: `npm run test`
- Contribution guidelines
- Workflow for contributions (e.g. forking, feature branch, pull request)

# Changelog
- v1.0: initial release [insert date]

# License Information

# Contributor Information
- Joe Ostrow https://github.com/JSTRO
- Jonas Gantar https://github.com/TJonasT
- Jonathan Valdes https://github.com/jonathanvaldes57
- Matthew Lee https://github.com/Mattholee
- Gavin Briggs-Perez https://github.com/gavinBP


