package com.example.lets_celebrate.entity;

import jakarta.persistence.*;

@Entity
public class ServicePackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long packageId;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceListing serviceListing;

    private String packageName;
    private Double price;
    private Integer duration; // hours
    private Integer guestLimit;
    private String inclusions;

    public ServicePackage() {}

    public Long getPackageId() { return packageId; }
    public void setPackageId(Long packageId) { this.packageId = packageId; }
    public ServiceListing getServiceListing() { return serviceListing; }
    public void setServiceListing(ServiceListing serviceListing) { this.serviceListing = serviceListing; }
    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public Integer getGuestLimit() { return guestLimit; }
    public void setGuestLimit(Integer guestLimit) { this.guestLimit = guestLimit; }
    public String getInclusions() { return inclusions; }
    public void setInclusions(String inclusions) { this.inclusions = inclusions; }
}
