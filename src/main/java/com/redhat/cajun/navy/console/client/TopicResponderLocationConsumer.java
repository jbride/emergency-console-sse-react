package com.redhat.cajun.navy.console.client;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;

import org.eclipse.microprofile.reactive.messaging.Acknowledgment;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;
import org.jboss.logging.Logger;

import io.smallrye.reactive.messaging.annotations.Broadcast;

@ApplicationScoped
public class TopicResponderLocationConsumer {

    private static Logger log = Logger.getLogger(TopicResponderLocationConsumer.class);

    @PostConstruct
    public void start() {
        log.info("start()");
    }

    @Incoming("topic-responder-location")
    @Acknowledgment(Acknowledgment.Strategy.PRE_PROCESSING)  // Ack message prior to message processing
    @Outgoing("responder-location-update-stream")                         
    @Broadcast                                               // Events are dispatched to all streaming subscribers
    public String process(String event) {
        log.infov("Received event: {0}", event);
        return event;
    }
}