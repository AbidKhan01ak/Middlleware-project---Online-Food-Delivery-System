package com.foodieExpress.customer_service.messaging;

import com.foodieExpress.customer_service.config.RabbitMQConfig;
import com.foodieExpress.customer_service.model.Order;
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
}
