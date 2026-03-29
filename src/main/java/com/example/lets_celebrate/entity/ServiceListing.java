package com.example.lets_celebrate.entity;

import jakarta.persistence.*;

@Entity
public class ServiceListing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ServiceCategory category;

    private String title;
    private String description;
    private String city;
    private Double basePrice;
    private String pricingType; // "FIXED" or "QUOTE"
    private Boolean instantBookEnabled;
    private String status = "ACTIVE";

    public ServiceListing() {}

    public Long getServiceId() { return serviceId; }
    public void setServiceId(Long serviceId) { this.serviceId = serviceId; }
    public Vendor getVendor() { return vendor; }
    public void setVendor(Vendor vendor) { this.vendor = vendor; }
    public ServiceCategory getCategory() { return category; }
    public void setCategory(ServiceCategory category) { this.category = category; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }
    public String getPricingType() { return pricingType; }
    public void setPricingType(String pricingType) { this.pricingType = pricingType; }
    public Boolean getInstantBookEnabled() { return instantBookEnabled; }
    public void setInstantBookEnabled(Boolean instantBookEnabled) { this.instantBookEnabled = instantBookEnabled; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
