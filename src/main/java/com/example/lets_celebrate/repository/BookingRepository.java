package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
