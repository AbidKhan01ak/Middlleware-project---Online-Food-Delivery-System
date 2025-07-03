package com.foodieExpress.restaurant_service.messaging;

import com.foodieExpress.restaurant_service.config.RabbitMQConfig;
import com.foodieExpress.restaurant_service.model.Order;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class OrderListener {

    @RabbitListener(queues = RabbitMQConfig.QUEUE)
    public void receiveOrder(Order order) {
        System.out.println("📦 Received Order:");
        System.out.println("➡️ Order ID     : " + order.getOrderId());
        System.out.println("➡️ Customer ID  : " + order.getCustomerId());
        System.out.println("➡️ Restaurant ID: " + order.getRestaurantId());
        System.out.println("➡️ Items        : " + order.getItems());
        System.out.println("➡️ Address      : " + order.getAddress());
        System.out.println("➡️ Status       : " + order.getStatus());
    }
}
