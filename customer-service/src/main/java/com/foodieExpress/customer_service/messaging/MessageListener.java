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


    // @RabbitListener(queues = "order-status-updates")
    // public void debugAllMessages(Object msg) {
    //     System.out.println("Raw message received: " + msg);
    // }
    
    @RabbitListener(queues = "order-status-updates")
    public void handleOrderStatusUpdate(OrderMessage message) {
        String orderId = message.getOrderId();
        String newStatus = message.getStatus();

        Optional<Order> orderOptional = orderRepository.findByOrderId(orderId);
        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setStatus(newStatus);
            log.info("Received order status update: orderId={}, newStatus={}", message.getOrderId(), message.getStatus());
            log.info("/////////////////////////////////////////////////////");
            log.info("Received status update: orderId={}, status={}", orderId, newStatus);
            orderRepository.save(order);
            System.out.println("Order status updated to " + newStatus + " for Order ID " + orderId);
        } else {
            System.err.println("Order not found with ID: " + orderId);
        }
    }   
}
