package com.example.lets_celebrate.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AvailabilitySlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long slotId;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private ServiceListing serviceListing;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    private String status = "AVAILABLE"; // AVAILABLE, LOCKED, BOOKED
    private LocalDateTime lockExpiry;

    public AvailabilitySlot() {}

    public Long getSlotId() { return slotId; }
    public void setSlotId(Long slotId) { this.slotId = slotId; }
    public ServiceListing getServiceListing() { return serviceListing; }
    public void setServiceListing(ServiceListing serviceListing) { this.serviceListing = serviceListing; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getLockExpiry() { return lockExpiry; }
    public void setLockExpiry(LocalDateTime lockExpiry) { this.lockExpiry = lockExpiry; }
}
