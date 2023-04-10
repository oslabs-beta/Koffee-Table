// docker run -p 9090:9090 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=jonas.local:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://jonas.local:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 

docker run --name zookeeper -p 2181:2181 -d zookeeper
