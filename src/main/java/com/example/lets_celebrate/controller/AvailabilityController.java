package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.AvailabilitySlot;
import com.example.lets_celebrate.service.AvailabilityService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {
    
    private final AvailabilityService availabilityService;
    
    public AvailabilityController(AvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<AvailabilitySlot>> getAvailability(
            @PathVariable Long serviceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(availabilityService.findAvailability(serviceId, date.atStartOfDay()));
    }
    
    @PostMapping("/lock/{slotId}")
    public ResponseEntity<AvailabilitySlot> lockSlot(@PathVariable Long slotId) {
        return ResponseEntity.ok(availabilityService.lockSlot(slotId));
    }
    
    @PostMapping("/release/{slotId}")
    public ResponseEntity<AvailabilitySlot> releaseSlot(@PathVariable Long slotId) {
        return ResponseEntity.ok(availabilityService.releaseSlot(slotId));
    }
}
