package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.ServiceListing;
import com.example.lets_celebrate.service.ListingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
public class ListingController {
    
    private final ListingService listingService;
    
    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }
    
    @PostMapping
    public ResponseEntity<ServiceListing> createService(@RequestBody ServiceListing listing) {
        return ResponseEntity.ok(listingService.createListing(listing));
    }
    
    @GetMapping("/{serviceId}")
    public ResponseEntity<ServiceListing> getService(@PathVariable Long serviceId) {
        return listingService.getListing(serviceId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<ServiceListing>> searchServices(
            @RequestParam String city,
            @RequestParam String category) {
        return ResponseEntity.ok(listingService.search(city, category));
    }
}
