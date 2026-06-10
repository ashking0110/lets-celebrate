package com.example.lets_celebrate.config;

import com.example.lets_celebrate.entity.*;
import com.example.lets_celebrate.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("!prod")
public class DataInitializer implements CommandLineRunner {

    private final ServiceCategoryRepository categoryRepo;
    private final VendorRepository vendorRepo;
    private final ServiceListingRepository listingRepo;
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public DataInitializer(
            ServiceCategoryRepository categoryRepo,
            VendorRepository vendorRepo,
            ServiceListingRepository listingRepo,
            UserRepository userRepo) {
        this.categoryRepo = categoryRepo;
        this.vendorRepo = vendorRepo;
        this.listingRepo = listingRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void run(String... args) {
        if (categoryRepo.count() > 0) return;

        // Categories
        ServiceCategory venue = category("Venue");
        ServiceCategory photography = category("Photography");
        ServiceCategory catering = category("Catering");
        ServiceCategory flowers = category("Flowers");
        ServiceCategory cake = category("Cake");

        // Vendors
        Vendor sweetCelebrations = vendor("Sweet Celebrations", "Priya Sharma", "Mumbai");
        Vendor elegantVenues = vendor("Elegant Venues Co.", "Rahul Mehta", "Mumbai");
        Vendor momentsPhotography = vendor("Moments Photography", "Anika Patel", "Delhi");
        Vendor bloomFlorists = vendor("Bloom Florists", "Suresh Kumar", "Bangalore");

        // Services
        listing("Custom Wedding Cake Design", "Artisan tiered cakes crafted to your theme.", 400.0, "FIXED", cake, sweetCelebrations, "Mumbai");
        listing("Garden Wedding Venue", "Lush outdoor garden venue for up to 300 guests.", 3500.0, "FIXED", venue, elegantVenues, "Mumbai");
        listing("Premium Wedding Photography", "Full-day coverage with edited album and prints.", 2500.0, "FIXED", photography, momentsPhotography, "Delhi");
        listing("Floral Decor Package", "Complete venue decoration with fresh flowers.", 1200.0, "QUOTE", flowers, bloomFlorists, "Bangalore");
        listing("Royal Wedding Catering", "Multi-cuisine buffet for up to 500 guests.", 5000.0, "QUOTE", cake, sweetCelebrations, "Mumbai");

        // Demo user  (password: password123)
        if (userRepo.findByEmail("demo@test.com").isEmpty()) {
            User demo = new User();
            demo.setName("Demo User");
            demo.setEmail("demo@test.com");
            demo.setPasswordHash(encoder.encode("password123"));
            demo.setPhone("9999999999");
            demo.setCity("Mumbai");
            demo.setRole("Customer");
            userRepo.save(demo);
        }
    }

    private ServiceCategory category(String name) {
        ServiceCategory c = new ServiceCategory();
        c.setName(name);
        return categoryRepo.save(c);
    }

    private Vendor vendor(String businessName, String ownerName, String city) {
        Vendor v = new Vendor();
        v.setBusinessName(businessName);
        v.setOwnerName(ownerName);
        v.setCity(city);
        v.setVerificationStatus("VERIFIED");
        v.setRating(4.8);
        return vendorRepo.save(v);
    }

    private void listing(String title, String description, Double basePrice, String pricingType,
                         ServiceCategory category, Vendor vendor, String city) {
        ServiceListing s = new ServiceListing();
        s.setTitle(title);
        s.setDescription(description);
        s.setBasePrice(basePrice);
        s.setPricingType(pricingType);
        s.setCategory(category);
        s.setVendor(vendor);
        s.setCity(city);
        s.setInstantBookEnabled(true);
        listingRepo.save(s);
    }
}
