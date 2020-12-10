package com.redhat.cajun.navy.console.resource;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.jboss.resteasy.annotations.SseElementType;
import org.reactivestreams.Publisher;

import org.jboss.logging.Logger;


@Path("incidentCommand")
public class IncidentCommandResource {

    private static Logger log = Logger.getLogger(IncidentCommandResource.class);

    @Inject
    @Channel("incident-command-stream") Publisher<String> incidentCommand;


    @GET
    @Path("/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> stream() { 
        return incidentCommand;
    }
}
