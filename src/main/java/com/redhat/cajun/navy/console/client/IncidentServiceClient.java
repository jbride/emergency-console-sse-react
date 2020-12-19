package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("")
@RegisterRestClient
public interface IncidentServiceClient {

    @GET
    @Path("/incidents")
    @Produces("application/json")
    Uni<String> getAll();

    @GET
    @Path("/incidents/incident/{id}")
    @Produces("application/json")
    Uni<String> getById(@PathParam String id);

}