package com.foodieExpress.customer_service.controller;

import com.foodieExpress.customer_service.dto.OrderMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerNotificationController {
    @PostMapping("/ready")
    public ResponseEntity<String> orderReady(@RequestBody OrderMessage message) {
        return ResponseEntity.ok("Customer notified: Order is ready");
    }

    @PostMapping("/pickedup")
    public ResponseEntity<String> orderPickedUp(@RequestBody OrderMessage message) {
        return ResponseEntity.ok("Customer notified: Order picked up");
    }

    @PostMapping("/delivered")
    public ResponseEntity<String> orderDelivered(@RequestBody OrderMessage message) {
        return ResponseEntity.ok("Customer notified: Order delivered");
    }

    @PostMapping("/status")
    public ResponseEntity<String> orderStatus(@RequestBody OrderMessage message) {
        return ResponseEntity.ok("Customer notified of status update");
    }
}
