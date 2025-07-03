package com.foodieExpress.driver_service.messaging;

import com.foodieExpress.driver_service.model.Order;
import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

@Component
public class OrderAssignmentListener {

    @RabbitListener(queues = "order.assigned.queue")
    public void receiveOrder(Order order) {
        System.out.println("📦 New delivery assigned to driver: " + order);
        // Save or handle order if needed
    }
}
