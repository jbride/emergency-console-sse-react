package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("")
@RegisterRestClient
public interface MissionServiceClient {

    @GET
    @Path("/api/missions")
    @Produces("application/json")
    Uni<String> getMissions();

    @GET
    @Path("/api/missions/responders/{id}")
    @Produces("application/json")
    Uni<String> getByResponder(@PathParam String id);

}