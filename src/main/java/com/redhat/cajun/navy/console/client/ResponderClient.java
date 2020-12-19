package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;

import com.redhat.cajun.navy.console.model.Responder;

@Path("")
@RegisterRestClient
public interface ResponderClient {

    @GET
    @Path("/responders/available")
    Uni<String> available();

    @GET
    @Path("/responder/byname/{name}")
    Uni<String> getByName(@PathParam String name);

    @GET
    @Path("/responder/{id}")
    Uni<String> getById(@PathParam int id);

    @GET
    @Path("/responders")
    Uni<String> getAllResponders();

    @GET
    @Path("/stats")
    Uni<String> getStats();

    @POST
    @Path("/responder")
    Uni<String> addResponder(Responder responder);

    @PUT
    @Path("/responder")
    Uni<String> updateResponder(Responder responder);

}