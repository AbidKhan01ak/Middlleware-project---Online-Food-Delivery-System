package com.foodieExpress.customer_service.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.foodieExpress.customer_service.dto.OrderMessage;
import org.springframework.stereotype.Service;

@Service
public class MessageListener {
    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);
    
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
}
