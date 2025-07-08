package com.foodieExpress.restaurant_service.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import com.foodieExpress.restaurant_service.repository.OrderRepository;
import com.foodieExpress.restaurant_service.model.Order;

import org.springframework.stereotype.Service;

@Service
public class MessageListener {
    
    // private static final Logger log = LoggerFactory.getLogger(MessageListener.class);

    private final OrderRepository orderRepository;

    public MessageListener(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @RabbitListener(queues = "order-status-updates") // Must match the queue name from driver publisher
    public void handleStatusUpdate(OrderMessage message) {
        String orderId = message.getOrderId();
        String status = message.getStatus();
        System.out.println("Received status update for Order ID: " + orderId + ", Status: " + status);
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
            System.out.println("✅ Restaurant updated order " + orderId + " to status: " + status);
        } else {
            System.err.println("❌ Order not found in restaurant DB for ID: " + orderId);
        }
    }
    
    // @RabbitListener(queues = "order.delivered.queue")
    // public void handleOrderDelivered(OrderMessage message) {
    //     log.info("Restaurant received delivery confirmation for orderId: {}", message.getOrderId());
    //     // Optional: update DB, trigger UI, analytics, etc.
    // }
}
