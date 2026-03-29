package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.AvailabilitySlot;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Long> {
    List<AvailabilitySlot> findByServiceListing_ServiceIdAndStartTimeBetween(Long serviceId, LocalDateTime start, LocalDateTime end);
}
