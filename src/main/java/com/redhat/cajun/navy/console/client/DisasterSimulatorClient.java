package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("")
@RegisterRestClient
public interface DisasterSimulatorClient {

    @ConfigProperty(name="com.redhat.cajun.navy.console.DisasterSimulatorClient.numIncidentsToReturn", defaultValue="50")
    int numIncidentsToReturn = 0;

    @GET
    @Path("/c/responders?clearResponders=true")
    @Produces("application/json")
    Uni<String> clearResponders();

    @GET
    @Path("/g/incidents?incidents="+numIncidentsToReturn)
    @Produces("application/json")
    Uni<String> generateIncidents();

    @GET
    @Path("/g/responders")
    @Produces("application/json")
    Uni<String> generateResponders();

}