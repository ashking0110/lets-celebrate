package com.example.lets_celebrate.service;

import com.example.lets_celebrate.entity.Payment;
import com.example.lets_celebrate.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment createOrder(Payment payment) {
        payment.setStatus("PENDING");
        return paymentRepository.save(payment);
    }

    public Optional<Payment> processWebhook(Long paymentId, String status, String gatewayRef) {
        return paymentRepository.findById(paymentId).map(p -> {
            p.setStatus(status);
            p.setGatewayReference(gatewayRef);
            if ("SUCCESS".equals(status)) {
                p.setPaidAt(LocalDateTime.now());
            }
            return paymentRepository.save(p);
        });
    }

    public Optional<Payment> getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId);
    }
}
