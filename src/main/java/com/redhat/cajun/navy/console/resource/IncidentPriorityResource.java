package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.redhat.cajun.navy.console.client.IncidentPriorityClient;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import io.smallrye.mutiny.Uni;

@Path("incident-priority")
@ApplicationScoped
public class IncidentPriorityResource {

    @Inject
    @RestClient
    public IncidentPriorityClient incidentPriorityRestClient;

    @GET
    @Path("/priority-zones")
    @Produces("application/json")
    public Uni<String> getPriorityZones(){
        return incidentPriorityRestClient.getPriorityZones();
    }

}
