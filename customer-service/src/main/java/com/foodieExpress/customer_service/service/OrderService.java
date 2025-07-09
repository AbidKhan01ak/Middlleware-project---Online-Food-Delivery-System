package com.foodieExpress.customer_service.service;

import com.foodieExpress.customer_service.dto.OrderRequest;
import com.foodieExpress.customer_service.messaging.RabbitMQPublisher;
import com.foodieExpress.customer_service.model.DeliveryStatus;
import com.foodieExpress.customer_service.model.Order;

import com.foodieExpress.customer_service.repository.OrderRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    private final RabbitMQPublisher publisher;
    private final OrderRepository orderRepository;
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    public OrderService(RabbitMQPublisher publisher, OrderRepository orderRepository){
        this.publisher = publisher;
        this.orderRepository = orderRepository;
    }

    public Order placeOrder(OrderRequest request) {
        Order order = Order.fromRequest(request);
        orderRepository.save(order); // save to DB
        publisher.sendOrderPlaced(order);
        return order;
    }

    public void updateOrderStatus(String orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(newStatus);
        log.info("Updating orderId: {}, New Status: {}", orderId, newStatus);
        orderRepository.save(order);
        log.info("Order after update: {}", orderRepository.findById(orderId).get());
    }

    public void updateStatus(DeliveryStatus status) {

        orderRepository.findByOrderId(status.getOrderId()).ifPresent(order -> {
            order.setStatus(status.getStatus());
            orderRepository.save(order);

            // NEW: publish status update
            publisher.sendOrderStatusUpdate(order);
        });
    }

    public DeliveryStatus getStatus(String orderId) {
        return orderRepository.findByOrderId(orderId)
                .map(order -> new DeliveryStatus(order.getOrderId(), order.getStatus(), order.getRestaurantId(), order.getCustomerId()))
                .orElse(new DeliveryStatus(orderId, "NOT FOUND", "", "placed"));
    }

    public Order getOrderById(String orderId) {
        return orderRepository.findByOrderId(orderId).orElse(null);
    }
}
