package com.foodieExpress.customer_service.controller;

import com.foodieExpress.customer_service.model.DeliveryStatus;
import com.foodieExpress.customer_service.dto.OrderRequest;
import com.foodieExpress.customer_service.dto.OrderResponse;
import com.foodieExpress.customer_service.model.Order;
import com.foodieExpress.customer_service.service.OrderService;

import java.time.LocalDateTime;

import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService service) {
        this.orderService = service;
    }

    
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody OrderRequest request) {
        Order order = orderService.placeOrder(request);
        double totalPrice = request.getItems().stream()
        .mapToDouble(item -> item.getPrice() * item.getQuantity())
        .sum();
        OrderResponse response = new OrderResponse();
        response.setMessage("Order placed successfully");
        response.setOrderId(order.getOrderId());
        response.setRestaurantName(order.getRestaurantName());
        response.setAddress(order.getAddress());
        response.setTotalPrice(totalPrice);
        response.setItems(order.getItems());
        response.setStatus(order.getStatus());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/status")
    public ResponseEntity<String> updateDeliveryStatus(@RequestBody DeliveryStatus status) {
        // This endpoint gets status updates from the driver via middleware
        System.out.println("Received status update from driver: " + status);
        return ResponseEntity.ok("Customer notified of delivery status");
    }
    @GetMapping("/status-only/{orderId}")
        public ResponseEntity<?> getOrderStatusOnly(@PathVariable String orderId) {
        Order order = orderService.getOrderById(orderId);
        if (order == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Order not found"));
        }
        return ResponseEntity.ok(Map.of("status", order.getStatus()));
    }
    @GetMapping("/status/{orderId}")
    public ResponseEntity<OrderResponse> getOrderStatus(@PathVariable String orderId) {
    Order order = orderService.getOrderById(orderId);
    if (order == null) {
        return ResponseEntity.notFound().build();
    }

    OrderResponse response = new OrderResponse();
    response.setMessage("Order status retrieved successfully");
    response.setOrderId(order.getOrderId());
    response.setRestaurantName(order.getRestaurantName());
    response.setAddress(order.getAddress());
    response.setItems(order.getItems());
    response.setStatus(order.getStatus());
    response.setTotalPrice(order.getTotalPrice());

    // For demo: static 30-minute delivery time
    response.setEstimatedDeliveryTime(LocalDateTime.now().plusMinutes(30).toString());

    return ResponseEntity.ok(response);
}

}
