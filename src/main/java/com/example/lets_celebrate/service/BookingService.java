package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.Booking;
import com.example.lets_celebrate.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking createBooking(Booking booking) {
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBooking(Long bookingId) {
        return bookingRepository.findById(bookingId);
    }

    public Optional<Booking> cancelBooking(Long bookingId) {
        return bookingRepository.findById(bookingId).map(b -> {
            b.setStatus("CANCELLED");
            return bookingRepository.save(b);
        });
    }

    public Optional<Booking> confirmBooking(Long bookingId) {
        return bookingRepository.findById(bookingId).map(b -> {
            b.setStatus("CONFIRMED");
            return bookingRepository.save(b);
        });
    }
}
