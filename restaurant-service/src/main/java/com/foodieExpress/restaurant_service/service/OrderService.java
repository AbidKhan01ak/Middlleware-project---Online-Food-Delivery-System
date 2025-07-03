package com.foodieExpress.restaurant_service.service;
import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }
    public void processOrder(Order order) {
        System.out.println("Processing order in restaurant: " + order);
        repository.save(order);
    }
    public List<Order> getAcceptedOrders() {
        return repository.findAll().stream()
                .filter(order -> "ACCEPTED".equalsIgnoreCase(order.getStatus()))
                .toList();
    }

    public void markOrderAccepted(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        order.setStatus("ACCEPTED");
        repository.save(order);
    }
}