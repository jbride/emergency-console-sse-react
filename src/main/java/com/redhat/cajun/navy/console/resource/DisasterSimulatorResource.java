package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;

import com.redhat.cajun.navy.console.client.DisasterSimulatorClient;

import org.eclipse.microprofile.rest.client.inject.RestClient;

import io.smallrye.mutiny.Uni;


@Path("disaster-simulator")
@ApplicationScoped
public class DisasterSimulatorResource {

    @Inject
    @RestClient
    public DisasterSimulatorClient disasterSimulatorRestClient;

    @DELETE
    @Path("/responders")
    public Uni<String> clearResponders(){
        return disasterSimulatorRestClient.clearResponders();
    }

    
    @POST
    @Path("/incidents/generate")
    public Uni<String> generateIncidents(){
        return disasterSimulatorRestClient.generateIncidents();
    }

    @POST
    @Path("/responders/generate")
    public Uni<String> generateResponders(){
        return disasterSimulatorRestClient.generateResponders();
    }

}
