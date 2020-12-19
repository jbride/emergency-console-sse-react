package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.redhat.cajun.navy.console.client.IncidentServiceClient;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.SseElementType;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.reactivestreams.Publisher;

import io.smallrye.mutiny.Uni;

import org.jboss.logging.Logger;


@Path("incident")
@ApplicationScoped
public class IncidentResource {

    private static Logger log = Logger.getLogger(IncidentResource.class);

    @Inject
    @Channel("incident-update-stream") Publisher<String> incidents;

    @Inject
    @Channel("incident-command-stream") Publisher<String> incidentCommand;

    @Inject
    @RestClient
    IncidentServiceClient incidentRestClient;

    @GET
    @Path("event/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> eventStream() { 
        return incidents;
    }

    @GET
    @Path("command/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> commandStream() { 
        return incidentCommand;
    }

    @GET
    @Path("/all")
    @Produces("application/json")
    public Uni<String> getAll(){
        return incidentRestClient.getAll();
    }

    @GET
    @Path("/{id}")
    @Produces("application/json")
    public Uni<String> getById(@PathParam String id){
        return incidentRestClient.getById(id);
    }
}
