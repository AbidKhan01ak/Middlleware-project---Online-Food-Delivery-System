package com.foodieExpress.middleware_service.messaging;

import com.foodieExpress.middleware_service.config.RabbitMQConfig;
import com.foodieExpress.middleware_service.dto.OrderMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessagePublisher {

    private final RabbitTemplate rabbitTemplate;

    public MessagePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendToRestaurant(OrderMessage message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "order.placed", message);
    }

    public void sendToDriver(OrderMessage message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "order.accepted", message);
    }

    public void sendToCustomer(OrderMessage message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, "order.delivery", message);
    }
}
