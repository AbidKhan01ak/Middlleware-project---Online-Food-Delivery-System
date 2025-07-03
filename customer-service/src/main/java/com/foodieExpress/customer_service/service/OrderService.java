package com.foodieExpress.customer_service.service;

import com.foodieExpress.customer_service.dto.OrderRequest;
import com.foodieExpress.customer_service.messaging.RabbitMQPublisher;
import com.foodieExpress.customer_service.model.DeliveryStatus;
import com.foodieExpress.customer_service.model.Order;

import com.foodieExpress.customer_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderService {

    private final RabbitMQPublisher publisher;
    private final OrderRepository orderRepository;

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

    public void updateStatus(DeliveryStatus status) {

        Optional<Order> optionalOrder = orderRepository.findByOrderId(status.getOrderId());
        optionalOrder.ifPresent(order -> {
            order.setStatus(status.getStatus());
            orderRepository.save(order);
        });
    }

    public DeliveryStatus getStatus(String orderId) {
        return orderRepository.findByOrderId(orderId)
                .map(order -> new DeliveryStatus(order.getOrderId(), order.getStatus()))
                .orElse(new DeliveryStatus(orderId, "No updates yet!"));
    }
}
