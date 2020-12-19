package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.redhat.cajun.navy.console.client.MissionServiceClient;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.SseElementType;
import org.jboss.resteasy.annotations.jaxrs.PathParam;
import org.reactivestreams.Publisher;

import io.smallrye.mutiny.Uni;

import org.jboss.logging.Logger;


@Path("mission")
@ApplicationScoped
public class MissionResource {

    private static Logger log = Logger.getLogger(MissionResource.class);

    @Inject
    @Channel("mission-stream") Publisher<String> mission;

    @Inject
    @RestClient
    MissionServiceClient missionRestClient;

    @GET
    @Path("/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> stream() { 
        return mission;
    }

    @GET
    @Path("/all")
    @Produces("application/json")
    public Uni<String> getMissions(){
        return missionRestClient.getMissions();
    }

    @GET
    @Path("/responders/{id}")
    @Produces("application/json")
    public Uni<String> getByResponder(@PathParam String id){
        return missionRestClient.getByResponder(id);
    }
}
