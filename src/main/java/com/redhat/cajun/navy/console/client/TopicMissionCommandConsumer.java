package com.redhat.cajun.navy.console.client;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Acknowledgment;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;
import org.jboss.logging.Logger;

import io.smallrye.reactive.messaging.annotations.Blocking;
import io.smallrye.reactive.messaging.annotations.Broadcast;

@ApplicationScoped
public class TopicMissionCommandConsumer {

    private static Logger log = Logger.getLogger(TopicMissionCommandConsumer.class);

    @PostConstruct
    public void start() {
        log.info("start()");
    }

    @Incoming("topic-mission-event")
    @Blocking // Ensure execution occurs on a worker thread rather than on the event loop thread (which would never be blocked)
    @Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)  // Ack message prior to message processing
    @Outgoing("mission-stream")                         
    @Broadcast                                               // Events are dispatched to all streaming subscribers
    public String process(String event ) {
        log.infov("Received event: {0}", event);
        return event;
    }

    // Forces vert.x io thread to begin consumption on message channel
    // Otherwise, initialization of message channel will not occur until ServerSideEvent class receives first request
    // Expect to see a log statement similar to the following:
    //   INFO  [org.apache.kafka.clients.consumer.KafkaConsumer] (vert.x-kafka-consumer-thread-0) [Consumer clientId=consumer-e-console-react-group-1, groupId=e-console-react-group] Subscribed to topic(s): topic-incident-command
    @Incoming("mission-stream")
    public void capture(String x) {
    }
}
