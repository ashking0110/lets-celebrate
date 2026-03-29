package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
}
