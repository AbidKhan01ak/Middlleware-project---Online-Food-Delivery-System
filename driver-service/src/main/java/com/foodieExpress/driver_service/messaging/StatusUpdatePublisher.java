package com.foodieExpress.driver_service.messaging;

import com.foodieExpress.driver_service.dto.OrderMessage;
import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Component
public class StatusUpdatePublisher {

    private final RabbitTemplate rabbitTemplate;

    public StatusUpdatePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    // public void sendOrderPickedUp(OrderMessage message) {
    //     rabbitTemplate.convertAndSend("order.exchange", "order.pickedup", message);
    // }

    // public void sendOrderEnRoute(OrderMessage message) {
    //     rabbitTemplate.convertAndSend("order.exchange", "order.enroute", message);
    // }

    // public void sendOrderDelivered(OrderMessage message) {
    //     rabbitTemplate.convertAndSend("order.exchange", "order.delivered", message);
    // }

    public void sendOrderStatusUpdate(OrderMessage message) {
        System.out.println("Driver publishing status update: Order ID " + message.getOrderId() + ", Status: " + message.getStatus());
        rabbitTemplate.convertAndSend("order.exchange", "order.status", message);
    }
}
