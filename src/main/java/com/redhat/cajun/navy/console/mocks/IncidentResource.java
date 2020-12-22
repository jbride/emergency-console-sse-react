package com.redhat.cajun.navy.console.mocks;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Priority;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.redhat.cajun.navy.console.model.Incident;
import com.redhat.cajun.navy.console.model.IncidentEvent;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.resteasy.annotations.jaxrs.PathParam;

import io.quarkus.runtime.StartupEvent;
import io.smallrye.mutiny.Uni;

import org.jboss.logging.Logger;

@Path("/mock/incident")
@ApplicationScoped
public class IncidentResource {

    private static final String FILE_PATH = "com.redhat.erdemo.mock.incident.file.path";
    private static Logger log = Logger.getLogger(IncidentResource.class);
    private Map<String, Incident> incidentMap = new HashMap<String, Incident>();
    private ObjectMapper mapper = new ObjectMapper();

    @ConfigProperty(name = FILE_PATH)
    private String filePath;


    void onStart(@Observes @Priority(value = 1) StartupEvent ev) {
        InputStream fStream = this.getClass().getResourceAsStream(filePath);
        if(fStream == null) {
            throw new RuntimeException("onStart() the following file does not exist:  "+filePath);
        }
        try {
            IncidentEvent[] incidentEvents = mapper.readValue(fStream, IncidentEvent[].class);
            log.infov("onStart() parsed the following # of incident Events: {0}", incidentEvents.length);
            for(IncidentEvent iEvent : incidentEvents){
                Incident iObj = (Incident)iEvent.getBody();
                String incidentId = iObj.getId();
                log.infov("just added with incident id :    {0} ", incidentId);
                incidentMap.put(incidentId, iObj);
            }
		} catch (IOException e) {
			e.printStackTrace();
		}
    };

    @GET
    @Path("/all")
    @Produces("application/json")
    public Uni<String> getAll() throws JsonProcessingException{
        log.info("getAll()  invoked");
        Collection<Incident> incidents = incidentMap.values();
        return Uni.createFrom().item(mapper.writeValueAsString(incidents));
    }

    @GET
    @Path("/byId/{id}")
    @Produces("application/json")
    public Uni<String> getById(@PathParam String id) throws JsonProcessingException{
        Incident iObj = incidentMap.get(id);
        if(iObj == null) {
            throw new WebApplicationException("Not Found: "+id, Status.NOT_FOUND);
        }else {
            return Uni.createFrom().item(mapper.writeValueAsString(iObj));
        }
    }
}
