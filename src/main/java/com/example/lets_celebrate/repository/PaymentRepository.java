package com.example.lets_celebrate.repository;

import com.example.lets_celebrate.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
