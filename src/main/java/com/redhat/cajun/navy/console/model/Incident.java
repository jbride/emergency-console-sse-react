package com.redhat.cajun.navy.console.model;

import java.math.BigDecimal;

public class Incident {

    private String id;

    private BigDecimal lat;

    private BigDecimal lon;

    private int numberOfPeople;

    private boolean medicalNeeded;

    private long timestamp;

    private String victimName;

    private String victimPhoneNumber;

    private String status;

    public Incident() {}

    public String getId() {
        return id;
    }

    public BigDecimal getLat() {
        return lat;
    }

    public BigDecimal getLon() {
        return lon;
    }

    public int getNumberOfPeople() {
        return numberOfPeople;
    }

    public boolean isMedicalNeeded() {
        return medicalNeeded;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public String getVictimName() {
        return victimName;
    }

    public String getVictimPhoneNumber() {
        return victimPhoneNumber;
    }

    public String getStatus() {
        return status;
    }

	public void setId(String id) {
		this.id = id;
	}

	public void setLat(BigDecimal lat) {
		this.lat = lat;
	}

	public void setLon(BigDecimal lon) {
		this.lon = lon;
	}

	public void setNumberOfPeople(int numberOfPeople) {
		this.numberOfPeople = numberOfPeople;
	}

	public void setMedicalNeeded(boolean medicalNeeded) {
		this.medicalNeeded = medicalNeeded;
	}

	public void setTimestamp(long timestamp) {
		this.timestamp = timestamp;
	}

	public void setVictimName(String victimName) {
		this.victimName = victimName;
	}

	public void setVictimPhoneNumber(String victimPhoneNumber) {
		this.victimPhoneNumber = victimPhoneNumber;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
