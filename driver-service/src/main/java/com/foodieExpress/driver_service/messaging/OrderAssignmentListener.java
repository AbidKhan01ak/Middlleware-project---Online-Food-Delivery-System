package com.foodieExpress.driver_service.messaging;

import com.foodieExpress.driver_service.model.Order;
import org.springframework.stereotype.Component;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class OrderAssignmentListener {

    private final List<Order> assignedOrders = new CopyOnWriteArrayList<>();

    @RabbitListener(queues = "order.assigned.queue")
    public void receiveOrder(Order order) {
        System.out.println("📦 New delivery assigned to driver: " + order);
        // Save temporarily
        assignedOrders.add(order);
    }

    public List<Order> getAssignedOrders() {
        return assignedOrders;
    }
}
