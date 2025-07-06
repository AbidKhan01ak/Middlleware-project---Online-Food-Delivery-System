package com.foodieExpress.restaurant_service.messaging;

import com.foodieExpress.restaurant_service.dto.OrderMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQPublisher {
    
    private final RabbitTemplate rabbitTemplate;

    public RabbitMQPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrderReady(OrderMessage message) {
        rabbitTemplate.convertAndSend("order.exchange", "order.ready", message);
    }

    public void sendOrderDelivered(OrderMessage message) {
        rabbitTemplate.convertAndSend("order.exchange", "order.delivered.restaurant", message);
    }

    public void sendOrderStatusUpdate(OrderMessage message) {
        rabbitTemplate.convertAndSend("order.exchange", "order.status.update", message);
    }
}
