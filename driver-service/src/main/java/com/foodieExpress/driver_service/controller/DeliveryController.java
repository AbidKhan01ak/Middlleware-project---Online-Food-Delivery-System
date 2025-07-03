package com.foodieExpress.driver_service.controller;

import com.foodieExpress.driver_service.model.Order;
import com.foodieExpress.driver_service.model.DeliveryStatus;
import com.foodieExpress.driver_service.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/driver")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService){
        this.deliveryService = deliveryService;
    }
    @PostMapping("/status")
    public ResponseEntity<String> updateStatus(@RequestBody DeliveryStatus status) {
        deliveryService.updateStatus(status);
        return ResponseEntity.ok("Status updated");
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignOrder(@RequestBody Order order) {
    deliveryService.assignOrder(order);
    return ResponseEntity.ok("Order assigned to driver");
}
}
