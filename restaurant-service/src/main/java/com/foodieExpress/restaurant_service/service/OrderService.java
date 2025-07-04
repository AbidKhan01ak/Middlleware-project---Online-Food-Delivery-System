package com.foodieExpress.restaurant_service.service;
import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.foodieExpress.restaurant_service.messaging.RabbitMQPublisher;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import java.time.Instant;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final RabbitMQPublisher publisher;

    public OrderService(OrderRepository repository, RabbitMQPublisher publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }
    public void processOrder(Order order) {
        System.out.println("Processing order in restaurant: " + order);
        repository.save(order);
    }
    public List<Order> getAcceptedOrders() {
        return repository.findAll().stream()
                .filter(order -> "ACCEPTED".equalsIgnoreCase(order.getStatus()))
                .toList();
    }

    public void markOrderAccepted(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));
        order.setStatus("ACCEPTED");
        repository.save(order);
    }

    public void markOrderReadyAndNotify(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus("READY");
        repository.save(order);

        OrderMessage message = new OrderMessage();
        message.setOrderId(order.getOrderId());
        message.setCustomerId(order.getCustomerId());
        message.setRestaurantId(order.getRestaurantId());
        message.setStatus("READY");
        message.setTimestamp(Instant.now().toString());

        publisher.sendOrderReady(message);
    }

    public void confirmOrderDeliveredAndNotify(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus("DELIVERED");
        repository.save(order);

        OrderMessage message = new OrderMessage();
        message.setOrderId(order.getOrderId());
        message.setCustomerId(order.getCustomerId());
        message.setRestaurantId(order.getRestaurantId());
        message.setStatus("DELIVERED");
        message.setTimestamp(Instant.now().toString());

        publisher.sendOrderDelivered(message);
    }
}