# 1. Overview
# 2. Local ER-Demo Setup


## 2.1. Keycloak Integration
1. Start community keycloak container
   `````
   $ podman run -d \
        --name sso \
        -p 127.0.0.1:8090:8080 \
        -e KEYCLOAK_USER=master \
        -e KEYCLOAK_PASSWORD=master \
        quay.io/keycloak/keycloak:11.0.3
   `````
1. Seed keyclock server using sample realm at:  src/test/resources/realm.json

## 2.2. Kafka Integration
1. Start kafka (using community strimzi containers)
   `````
   $ podman-compose -f etc/docker-compose.yaml up -d
   `````

2. create topics
   `````
   $ for t in topic-incident-command topic-incident-event topic-mission-event topic-responder-command topic-responder-location-update topic-responder-event; do
       echo "$t"
       kafka-topics.sh \
            --bootstrap-server localhost:9092 \
            --create --topic $t \
            --replication-factor 1 \
            --partitions 2
     done
   `````

3. List topics
   `````
   $ kafka-topics.sh --bootstrap-server localhost:9092  --list
   `````

## webapp build and deploy

1. At root of webapp soruce code (src/main/javascript), create an `.env` file and populate with the following:
   `````
   SSO_URL=http://localhost:8090/auth
   SSO_REALM=user1-emergency-realm
   SSO_CLIENT=account-console

   INCIDENT_HOST: "http://localhost:8080"
   RESPONDER_HOST: "http://localhost:8080"
   MISSION_HOST: "http://localhost:8080"
   PROCESS_VIEWER_HOST: "http://localhost:8080"
   RESPONDER_SIMULATOR_HOST: "http://localhost:8080"
   DISASTER_SIMULATOR_HOST: "http://localhost:8080"
   PRIORITY_HOST: "http://localhost:8080"
   DISASTER_HOST: "http://localhost:8080"
   `````

1. At root of webapp source code (src/main/javascript), install all javascript dependencies:
   `````
   $ (cd src/main/javascript && npm install)
   `````

1. At root of webapp source code (src/main/javascript), execute javascript package manager to build and deploy:
   `````
   $ (cd src/main/javascript && npm run bdev)
   `````

1. From root of quarkus project, start quarkus in dev mode
   `````
   $ mvn clean quarkus:dev 
   `````

1. Open a web browser and navigate to:  http://localhost:8080
   
   NOTE: If you modify the javascript source code, simply re-run the above command to build and deploy using the javascript package manager 

## Manual Tests

### Kafka Test

4. topic-mission-event
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-mission-event
   `````
5. topic-responder-location-update
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-responder-location-update
   `````
6. topic-incident-event
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-incident-event
   `````
7. topic-incident-command
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-incident-command
   `````
8. topic-responder-event
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-responder-event
   `````
9.  topic-responder-command
   `````
   $ kafka-console-producer.sh --broker-list localhost:9092 --property parse.key=true --property key.separator=":" --topic topic-responder-command
   `````

