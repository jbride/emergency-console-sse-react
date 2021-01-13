package com.redhat.cajun.navy.console.mocks;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Iterator;

import javax.annotation.Priority;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.io.IOUtils;
import org.eclipse.microprofile.config.inject.ConfigProperty;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import io.quarkus.runtime.StartupEvent;
import io.smallrye.mutiny.Uni;

import org.jboss.logging.Logger;

@Path("/mock/disaster")
@ApplicationScoped
public class DisasterMock {

    private static final String FILE_PATH = "com.redhat.erdemo.mock.disaster.location.file.path";
    private static final String CENTER = "/center";
    private static Logger log = Logger.getLogger(DisasterMock.class);
    private String defaultDisasterLocationString;
    private ObjectMapper mapper = new ObjectMapper();

    @ConfigProperty(name = FILE_PATH)
    private String filePath;

    void onStart(@Observes @Priority(value = 1) StartupEvent ev) throws IOException {
        InputStream fStream = this.getClass().getResourceAsStream(filePath);
        if(fStream == null) {
            throw new RuntimeException("onStart() the following file does not exist:  "+filePath);
        }
        try {
            defaultDisasterLocationString = IOUtils.toString(fStream, StandardCharsets.UTF_8);
		} catch (IOException e) {
			e.printStackTrace();
		}finally {
            if(fStream != null)
              fStream.close();
        }
    };

    @GET
    @Path("/center")
    @Produces("application/json")
    public Uni<String> getDefaultCenter() throws JsonMappingException, JsonProcessingException {
        JsonNode treeNode = mapper.readTree(defaultDisasterLocationString);
        
        String center = treeNode.at(CENTER).toString();
        if(center == null || center.equals("")) {
            traverse(treeNode);
            throw new WebApplicationException(Status.NOT_FOUND);
        }
        return Uni.createFrom().item(center);
    }

    public static void traverse(JsonNode root){

        log.info("tree = "+ root.toString());
    
        if(root.isObject()){
            Iterator<String> fieldNames = root.fieldNames();
    
            while(fieldNames.hasNext()) {
                String fieldName = fieldNames.next();
                log.info("object name = "+fieldName);
            }
        } else if(root.isArray()){
            ArrayNode arrayNode = (ArrayNode) root;
            for(int i = 0; i < arrayNode.size(); i++) {
                JsonNode arrayElement = arrayNode.get(i);
                log.info("array field = "+arrayElement.asText());
            }
        } else {
            // JsonNode root represents a single value field - do something with it.
            
        }
    }
}
