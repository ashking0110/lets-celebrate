package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.ServiceListing;
import com.example.lets_celebrate.repository.ServiceListingRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ListingService {
    private final ServiceListingRepository listingRepository;

    public ListingService(ServiceListingRepository listingRepository) {
        this.listingRepository = listingRepository;
    }

    public ServiceListing createListing(ServiceListing listing) {
        listing.setStatus("ACTIVE");
        return listingRepository.save(listing);
    }

    public Optional<ServiceListing> getListing(Long serviceId) {
        return listingRepository.findById(serviceId);
    }

    public List<ServiceListing> search(String city, String category) {
        return listingRepository.findByCityAndCategory_Name(city, category);
    }
}
