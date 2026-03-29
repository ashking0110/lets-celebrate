package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.Vendor;
import com.example.lets_celebrate.service.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vendors")
public class VendorController {
    
    private final VendorService vendorService;
    
    public VendorController(VendorService vendorService) {
        this.vendorService = vendorService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<Vendor> register(@RequestBody Vendor vendor) {
        return ResponseEntity.ok(vendorService.register(vendor));
    }
    
    @GetMapping("/{vendorId}")
    public ResponseEntity<Vendor> getVendor(@PathVariable Long vendorId) {
        return vendorService.getVendor(vendorId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{vendorId}/verify")
    public ResponseEntity<Vendor> verifyVendor(@PathVariable Long vendorId) {
        return vendorService.verifyVendor(vendorId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
