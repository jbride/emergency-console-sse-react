package com.redhat.cajun.navy.console.model;

public class Responder {

    private Integer id;
    private String name;
    private String phoneNumber;
    private Double latitude;
    private Double longitude;
    private Integer boatCapacity;
    private Boolean medicalKit;
    private Boolean available;
    private Boolean person;
    private Boolean enrolled;

    public Responder() {
    }
    
    public Responder(Integer id, String name, String phoneNumber, Double latitude, Double longitude,
      Integer boatCapacity, Boolean medicalKit, Boolean available, Boolean person, Boolean enrolled) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.latitude = latitude;
        this.longitude = longitude;
        this.boatCapacity = boatCapacity;
        this.medicalKit = medicalKit;
        this.available = available;
        this.person = person;
        this.enrolled = enrolled;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Integer getBoatCapacity() {
        return boatCapacity;
    }

    public void setBoatCapacity(Integer boatCapacity) {
        this.boatCapacity = boatCapacity;
    }

    public Boolean getMedicalKit() {
        return medicalKit;
    }

    public void setMedicalKit(Boolean medicalKit) {
        this.medicalKit = medicalKit;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }

    public Boolean getPerson() {
        return person;
    }

    public void setPerson(Boolean person) {
        this.person = person;
    }

    public Boolean getEnrolled() {
        return enrolled;
    }

    public void setEnrolled(Boolean enrolled) {
        this.enrolled = enrolled;
    }

    @Override
    public String toString() {
        return "Responder [available=" + available + ", boatCapacity=" + boatCapacity + ", enrolled=" + enrolled
                + ", id=" + id + ", latitude=" + latitude + ", longitude=" + longitude + ", medicalKit=" + medicalKit
                + ", name=" + name + ", person=" + person + ", phoneNumber=" + phoneNumber + "]";
    }

}
