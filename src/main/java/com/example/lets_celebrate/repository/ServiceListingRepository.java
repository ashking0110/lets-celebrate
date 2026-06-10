package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.ServiceListing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceListingRepository extends JpaRepository<ServiceListing, Long> {
    List<ServiceListing> findByCityAndCategory_Name(String city, String categoryName);
    List<ServiceListing> findByCity(String city);
    List<ServiceListing> findByCategory_Name(String categoryName);
}
