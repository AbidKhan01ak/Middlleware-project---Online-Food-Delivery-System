package com.foodieExpress.restaurant_service.controller;

import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.service.OrderService;
import org.springframework.http.ResponseEntity;
import com.foodieExpress.restaurant_service.messaging.RabbitMQPublisher;
import org.springframework.web.bind.annotation.*;
import com.foodieExpress.restaurant_service.dto.OrderMessage;

import java.util.List;

@RestController
@RequestMapping("/api/restaurant")
public class OrderController {

    private final RabbitMQPublisher publisher;
    private final OrderService orderService;

    public OrderController(OrderService orderService, RabbitMQPublisher publisher) {
        this.orderService = orderService;
        this.publisher = publisher;
    }

    @PostMapping("/orders")
    public ResponseEntity<String> receiveOrder(@RequestBody Order order) {
        orderService.processOrder(order);
        return ResponseEntity.ok("Order received and is being processed by restaurant.");
    }

    @GetMapping("/accepted-orders")
    public ResponseEntity<List<Order>> getAcceptedOrders() {
        List<Order> acceptedOrders = orderService.getAcceptedOrders();
        return ResponseEntity.ok(acceptedOrders);
    }

    @PostMapping("/ready")
    public ResponseEntity<String> markOrderReady(@RequestBody OrderMessage message) {
        orderService.markOrderAccepted(message.getOrderId());
        publisher.sendOrderReady(message);
        return ResponseEntity.ok("Order marked as ready");
    }

    @PostMapping("/delivered")
    public ResponseEntity<String> confirmDelivery(@RequestBody OrderMessage message) {
        publisher.sendOrderDelivered(message);
        return ResponseEntity.ok("Order delivery confirmed to restaurant");
    }
}