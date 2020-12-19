package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("")
@RegisterRestClient
public interface IncidentPriorityClient {


    @GET
    @Path("/priority-zones")
    @Produces("application/json")
    Uni<String> getPriorityZones();

}