package com.redhat.cajun.navy.console.client;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import io.smallrye.mutiny.Uni;

import javax.ws.rs.POST;
import javax.ws.rs.Path;

import org.jboss.resteasy.annotations.jaxrs.FormParam;

@Path("")
@RegisterRestClient
public interface ResponderSimulatorClient {


    // Sample: {"missionId:" "12345", "status:" "PICKEDUP"}
    @POST
    @Path("/api/mission")
    Uni<String> updateMissionStatus(@FormParam String missionUpdatePayload );


}