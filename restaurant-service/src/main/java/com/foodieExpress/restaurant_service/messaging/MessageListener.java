package com.foodieExpress.restaurant_service.messaging;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import org.springframework.stereotype.Service;

@Service
public class MessageListener {
    
    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);
    
    @RabbitListener(queues = "order.delivered.queue")
    public void handleOrderDelivered(OrderMessage message) {
        log.info("Restaurant received delivery confirmation for orderId: {}", message.getOrderId());
        // Optional: update DB, trigger UI, analytics, etc.
    }
}
