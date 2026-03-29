package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.Vendor;
import com.example.lets_celebrate.repository.VendorRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class VendorService {
    private final VendorRepository vendorRepository;

    public VendorService(VendorRepository vendorRepository) {
        this.vendorRepository = vendorRepository;
    }

    public Vendor register(Vendor vendor) {
        vendor.setVerificationStatus("PENDING");
        return vendorRepository.save(vendor);
    }

    public Optional<Vendor> getVendor(Long vendorId) {
        return vendorRepository.findById(vendorId);
    }

    public Optional<Vendor> verifyVendor(Long vendorId) {
        return vendorRepository.findById(vendorId).map(v -> {
            v.setVerificationStatus("VERIFIED");
            return vendorRepository.save(v);
        });
    }
}
