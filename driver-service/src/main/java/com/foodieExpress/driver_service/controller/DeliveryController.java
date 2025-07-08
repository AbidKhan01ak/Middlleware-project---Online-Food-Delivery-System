package com.foodieExpress.driver_service.controller;

import com.foodieExpress.driver_service.dto.DriverOrderDTO;
import com.foodieExpress.driver_service.model.Order;
import com.foodieExpress.driver_service.model.DeliveryStatus;
import com.foodieExpress.driver_service.service.DeliveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/driver")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService){
        this.deliveryService = deliveryService;
    }

    @PostMapping("/status")
    public ResponseEntity<String> updateStatus(@RequestBody DeliveryStatus status) {
        deliveryService.updateStatusToPickedUp(status);
        return ResponseEntity.ok("Status updated");
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignOrder(@RequestBody Order order) {
        deliveryService.assignOrder(order);
        return ResponseEntity.ok("Order assigned to driver");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<DriverOrderDTO>> getAssignedOrders() {
        List<DriverOrderDTO> orders = deliveryService.getAssignedOrders();

        return ResponseEntity.ok(orders);
    }
}
