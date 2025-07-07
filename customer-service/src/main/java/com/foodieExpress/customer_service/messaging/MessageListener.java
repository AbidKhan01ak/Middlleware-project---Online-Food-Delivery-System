package com.foodieExpress.customer_service.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.foodieExpress.customer_service.dto.OrderMessage;
import org.springframework.stereotype.Service;
import com.foodieExpress.customer_service.model.Order;
import com.foodieExpress.customer_service.repository.OrderRepository;
import java.util.Optional;

@Service
public class MessageListener {
    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);

    private final OrderRepository orderRepository;

    public MessageListener(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }
    
    @RabbitListener(queues = "order.ready.queue")
    public void handleOrderReady(OrderMessage message) {
        log.info("Customer received: Order is ready for orderId: {}", message.getOrderId());
        // You can add notification logic here (email, push, etc.)
    }

    @RabbitListener(queues = "order.pickedup.queue")
    public void handlePickedUp(OrderMessage message) {
        log.info("Customer received: Order picked up by driver for orderId: {}", message.getOrderId());
    }

    @RabbitListener(queues = "order.delivered.queue")
    public void handleDelivered(OrderMessage message) {
        log.info("Customer received: Order delivered for orderId: {}", message.getOrderId());
    }

    @RabbitListener(queues = "order-status-updates")
    public void handleOrderStatusUpdate(OrderMessage message) {
        log.info("Awaiting order status update messages...");
        String orderId = message.getOrderId();
        String newStatus = message.getStatus();

        Optional<Order> orderOptional = orderRepository.findByOrderId(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(newStatus);
            log.info("Received order status update: orderId={}, newStatus={}", message.getOrderId(), message.getStatus());
            orderRepository.save(order);
            System.out.println("Order status updated to " + newStatus + " for Order ID " + orderId);
        } else {
            System.err.println("Order not found with ID: " + orderId);
        }
    }   
}
