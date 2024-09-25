package com.example.demo.Service;

import com.example.demo.Entity.Payment;
import com.example.demo.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setFullName(paymentDetails.getFullName());
        payment.setStreetAddress(paymentDetails.getStreetAddress());
        payment.setCity(paymentDetails.getCity());
        payment.setState(paymentDetails.getState());
        payment.setZipCode(paymentDetails.getZipCode());
        payment.setCountry(paymentDetails.getCountry());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setCardNumber(paymentDetails.getCardNumber());
        payment.setExpiryDate(paymentDetails.getExpiryDate());
        payment.setCvv(paymentDetails.getCvv());
        payment.setCardName(paymentDetails.getCardName());
        payment.setUpiId(paymentDetails.getUpiId());
        payment.setTotalAmount(paymentDetails.getTotalAmount());
        payment.setOrderConfirmed(paymentDetails.isOrderConfirmed());

        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
