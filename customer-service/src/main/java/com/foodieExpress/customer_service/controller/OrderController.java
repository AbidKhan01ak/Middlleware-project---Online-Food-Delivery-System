package com.foodieExpress.customer_service.controller;

import com.foodieExpress.customer_service.model.DeliveryStatus;
import com.foodieExpress.customer_service.dto.OrderRequest;
import com.foodieExpress.customer_service.dto.OrderResponse;
import com.foodieExpress.customer_service.model.Order;
import com.foodieExpress.customer_service.service.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        return ResponseEntity.ok(new OrderResponse("Order placed successfully", order.getOrderId()));
    }

    @PostMapping("/status")
    public ResponseEntity<String> updateDeliveryStatus(@RequestBody DeliveryStatus status) {
        // This endpoint gets status updates from the driver via middleware
        System.out.println("Received status update from driver: " + status);
        return ResponseEntity.ok("Customer notified of delivery status");
    }


}
