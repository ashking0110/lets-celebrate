package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.AvailabilitySlot;
import com.example.lets_celebrate.repository.AvailabilitySlotRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AvailabilityService {
    private final AvailabilitySlotRepository slotRepository;

    public AvailabilityService(AvailabilitySlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public List<AvailabilitySlot> findAvailability(Long serviceId, LocalDateTime date) {
        LocalDateTime startOfDay = date.toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1).minusNanos(1);
        return slotRepository.findByServiceListing_ServiceIdAndStartTimeBetween(serviceId, startOfDay, endOfDay);
    }

    public AvailabilitySlot lockSlot(Long slotId) {
        // Simplified without lock for MVP
        return slotRepository.findById(slotId).map(slot -> {
            slot.setStatus("LOCKED");
            slot.setLockExpiry(LocalDateTime.now().plusMinutes(15));
            return slotRepository.save(slot);
        }).orElseThrow(() -> new RuntimeException("Slot not found"));
    }

    public AvailabilitySlot releaseSlot(Long slotId) {
        return slotRepository.findById(slotId).map(slot -> {
            slot.setStatus("AVAILABLE");
            slot.setLockExpiry(null);
            return slotRepository.save(slot);
        }).orElseThrow(() -> new RuntimeException("Slot not found"));
    }
}
