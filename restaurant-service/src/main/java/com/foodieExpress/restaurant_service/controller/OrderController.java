package com.foodieExpress.restaurant_service.controller;

import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import com.foodieExpress.restaurant_service.dto.OrderDTO;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/restaurant")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<String> receiveOrder(@RequestBody Order order) {
        orderService.processOrder(order);
        return ResponseEntity.ok("Order received and is being processed by restaurant.");
    }

    @GetMapping("/accepted-orders")
    public ResponseEntity<List<OrderDTO>> getAcceptedOrders() {
        List<OrderDTO> acceptedOrders = orderService.getAcceptedOrders();
        return ResponseEntity.ok(acceptedOrders);
    }

    @PostMapping("/accepted")
    public ResponseEntity<String> markOrderAccepted(@RequestBody OrderMessage message) {
        orderService.markOrderAccepted(message.getOrderId());
        return ResponseEntity.ok("Order marked as accepted");
    }

    @PostMapping("/ready")
    public ResponseEntity<String> markOrderReady(@RequestBody OrderMessage message) {
        orderService.markOrderReadyAndNotify(message.getOrderId());
        return ResponseEntity.ok("Order marked as ready");
    }

    @PostMapping("/delivered")
    public ResponseEntity<String> confirmDelivery(@RequestBody OrderMessage message) {
        orderService.confirmOrderDeliveredAndNotify(message.getOrderId());
        return ResponseEntity.ok("Order delivery confirmed to restaurant");
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @PutMapping("/orders/prepared/{orderId}")
    public ResponseEntity<String> markOrderAsPrepared(@PathVariable String orderId) {
        orderService.markOrderAsPrepared(orderId);
        return ResponseEntity.ok("Order marked as prepared");
    }
}