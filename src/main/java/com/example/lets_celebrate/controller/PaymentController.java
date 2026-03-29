package com.example.lets_celebrate.controller;

import com.example.lets_celebrate.entity.Payment;
import com.example.lets_celebrate.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {
    
    private final PaymentService paymentService;
    
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }
    
    @PostMapping("/create-order")
    public ResponseEntity<Payment> createOrder(@RequestBody Payment payment) {
        return ResponseEntity.ok(paymentService.createOrder(payment));
    }
    
    @PostMapping("/webhook")
    public ResponseEntity<Payment> webhook(@RequestBody Map<String, String> payload) {
        Long paymentId = Long.parseLong(payload.get("paymentId"));
        String status = payload.get("status");
        String ref = payload.get("gatewayReference");
        return paymentService.processWebhook(paymentId, status, ref)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{paymentId}")
    public ResponseEntity<Payment> getPayment(@PathVariable Long paymentId) {
        return paymentService.getPayment(paymentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
