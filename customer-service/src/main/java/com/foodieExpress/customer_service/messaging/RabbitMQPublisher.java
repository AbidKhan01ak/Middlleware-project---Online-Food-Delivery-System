package com.foodieExpress.customer_service.messaging;

import com.foodieExpress.customer_service.config.RabbitMQConfig;
import com.foodieExpress.customer_service.dto.OrderMessage;
import com.foodieExpress.customer_service.model.Order;

import java.time.Instant;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class RabbitMQPublisher {

    private final RabbitTemplate rabbitTemplate;

    public RabbitMQPublisher(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrderPlaced(Order order){
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, RabbitMQConfig.ROUTING_KEY_PLACED, order);
    }

    public void sendOrderStatusUpdate(Order order){
        OrderMessage message = new OrderMessage();
        message.setOrderId(order.getOrderId());
        message.setCustomerId(order.getCustomerId());
        message.setRestaurantId(order.getRestaurantId());
        message.setStatus(order.getStatus());
        message.setTimestamp(Instant.now().toString());

        rabbitTemplate.convertAndSend("order.exchange", "order.status", message);
        System.out.println("📤 Sent status update to restaurant-service: " + message.getStatus());
    }
}
