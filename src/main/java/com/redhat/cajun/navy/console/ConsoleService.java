package com.redhat.cajun.navy.console;

import javax.annotation.Priority;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;

import com.redhat.cajun.navy.console.client.TopicIncidentCommandConsumer;
import com.redhat.cajun.navy.console.client.TopicIncidentEventConsumer;
import com.redhat.cajun.navy.console.client.TopicMissionCommandConsumer;
import com.redhat.cajun.navy.console.client.TopicResponderCommandConsumer;
import com.redhat.cajun.navy.console.client.TopicResponderLocationConsumer;
import com.redhat.cajun.navy.console.client.TopicResponderUpdateConsumer;

import org.jboss.logging.Logger;
import io.quarkus.runtime.StartupEvent;

@ApplicationScoped
public class ConsoleService {

    private static Logger log = Logger.getLogger(ConsoleService.class);

    @Inject
    TopicIncidentEventConsumer ieConsumer;

    @Inject
    TopicIncidentCommandConsumer icConsumer;

    @Inject
    TopicMissionCommandConsumer mcConsumer;

    @Inject
    TopicResponderCommandConsumer rcConsumer;

    @Inject
    TopicResponderLocationConsumer rlConsumer;

    @Inject
    TopicResponderUpdateConsumer ruConsumer;

    void onStart(@Observes @Priority(value = 1) StartupEvent ev) {
        log.info("onStart() ieConsumer = "+ieConsumer);
        log.info("onStart() icConsumer = "+icConsumer);
        log.info("onStart() mcConsumer = "+mcConsumer);
        log.info("onStart() rcConsumer = "+rcConsumer);
        log.info("onStart() rlConsumer = "+rlConsumer);
        log.info("onStart() ruConsumer = "+ruConsumer);
    }
}