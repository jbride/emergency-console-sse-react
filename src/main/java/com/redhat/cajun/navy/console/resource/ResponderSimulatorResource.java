package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;

import com.redhat.cajun.navy.console.client.ResponderSimulatorClient;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.jaxrs.FormParam;

import io.smallrye.mutiny.Uni;


@Path("responder-simulator")
@ApplicationScoped
public class ResponderSimulatorResource {

    @Inject
    @RestClient
    ResponderSimulatorClient responderSimulatorRestClient;

    @PUT
    @Path("/mission/")
    public Uni<String> updateMissionStatus(@FormParam String missionUpdatePayload){
        return responderSimulatorRestClient.updateMissionStatus(missionUpdatePayload);
    }

}
