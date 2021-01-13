package com.redhat.cajun.navy.console.resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.redhat.cajun.navy.console.client.DisasterServiceClient;

import org.eclipse.microprofile.rest.client.inject.RestClient;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.smallrye.mutiny.Uni;


@Path("disaster")
@ApplicationScoped
public class DisasterServiceResource {

    @Inject
    @RestClient
    DisasterServiceClient disasterServiceRestClient;

    @GET
    @Path("/shelters")
    @Produces("application/json")
    public Uni<String> getShelters(){
        return disasterServiceRestClient.getShelters();
    }

    @GET
    @Path("/inclusion-zones")
    @Produces("application/json")
    public Uni<String> getInclusionZones(){
        return disasterServiceRestClient.getInclusionZones();
    }

    @GET
    @Path("/center/")
    @Produces("application/json")
    public Uni<String> getDisasterCenter(){
        return disasterServiceRestClient.getDisasterCenter();
    }

}
