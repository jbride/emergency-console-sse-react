package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import com.redhat.cajun.navy.console.client.ResponderClient;
import com.redhat.cajun.navy.console.model.Responder;

import org.eclipse.microprofile.reactive.messaging.Channel;
import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.SseElementType;
import org.reactivestreams.Publisher;

import io.smallrye.mutiny.Uni;

import org.jboss.logging.Logger;


@Path("responder")
@ApplicationScoped
public class ResponderResource {

    private static Logger log = Logger.getLogger(ResponderResource.class);

    @Inject
    @Channel("responder-command-stream") Publisher<String> rCommands;

    @Inject
    @Channel("responder-update-stream") Publisher<String> rUpdates;

    @Inject
    @Channel("responder-location-update-stream") Publisher<String> rl;

    @Inject
    @RestClient
    ResponderClient responderRestClient;

    @GET
    @Path("/command/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> streamCommand() { 
        return rCommands;
    }

    @GET
    @Path("/event/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> streamEvent() { 
        return rUpdates;
    }

    @GET
    @Path("/location/stream")
    @Produces(MediaType.SERVER_SENT_EVENTS) 
    @SseElementType("text/plain") 
    public Publisher<String> streamLocation() { 
        return rl;
    }

    @GET
    @Path("/available")
    public Uni<String> available(){
        return responderRestClient.available();
    }

    // example: curl -v https://user1-emergency-console.apps.ratwater.xyz/responder/byname/Kinsley%20Barnes
    @GET
    @Path("/byname/{name}")
    public Uni<String> getByName(@PathParam String name){
        log.infov("getByName name = {0}", name);
        return responderRestClient.getByName(name);
    }

    @GET
    @Path("/byid/{id}")
    public Uni<String> getById(@PathParam int id){
        return responderRestClient.getById(id);
    }

    @GET
    @Path("/all")
    public Uni<String> getAllResponders(){
        return responderRestClient.getAllResponders();
    }

    @POST
    @Path("/")
    public Uni<String> addResponder(Responder responder){
        return responderRestClient.addResponder(responder);
    }

    @PUT
    @Path("/")
    public Uni<String> updateResponder(Responder responder){
        return responderRestClient.updateResponder(responder);
    }

    @GET
    @Path("/stats")
    public Uni<String> getResponderStats() {
        return responderRestClient.getStats();
    }

}
