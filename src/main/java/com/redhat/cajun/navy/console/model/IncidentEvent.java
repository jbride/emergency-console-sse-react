package com.redhat.cajun.navy.console.model;


public class IncidentEvent {

    private String id;

    private String messageType;

    private String invokingService;

    private long timestamp;

    private Incident body;

    public IncidentEvent() {}

    public String getMessageType() {
        return messageType;
    }

    public String getId() {
        return id;
    }

    public String getInvokingService() {
        return invokingService;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public Incident getBody() {
        return body;
    }

	public void setId(String id) {
		this.id = id;
	}

	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}

	public void setInvokingService(String invokingService) {
		this.invokingService = invokingService;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public void setBody(Incident body) {
		this.body = body;
	}
}
