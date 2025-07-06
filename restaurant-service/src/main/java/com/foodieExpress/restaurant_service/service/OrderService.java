package com.foodieExpress.restaurant_service.service;
import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.repository.OrderRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;
import com.foodieExpress.restaurant_service.messaging.RabbitMQPublisher;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import com.foodieExpress.restaurant_service.dto.OrderDTO;
import com.foodieExpress.restaurant_service.dto.OrderItemDTO;
import java.time.Instant;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final RabbitMQPublisher publisher;

    public OrderService(OrderRepository repository, RabbitMQPublisher publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }

    public Order acceptOrder(Long orderId) {
        Order order = repository.findById(orderId).orElseThrow();
        order.setStatus("Accepted");
        repository.save(order);

        // NEW: Publish message to customer-service
        OrderMessage orderMessage = new OrderMessage(order.getId(), "Accepted", order.getCustomerId());
        publisher.sendOrderStatusUpdate(orderMessage);  // via RabbitMQ

        return order;
    }
    public void processOrder(Order order) {
        System.out.println("Processing order in restaurant: " + order);
        repository.save(order);
    }
    public List<OrderDTO> getAcceptedOrders() {
        return repository.findAll().stream()
                .filter(order -> "ACCEPTED".equalsIgnoreCase(order.getStatus()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public void markOrderAccepted(String orderId) {
        Optional<Order> optionalOrder = repository.findById(orderId);
    if (optionalOrder.isPresent()) {
        Order order = optionalOrder.get();
        order.setStatus("ACCEPTED");
        repository.save(order);
    }
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
        message.setAddress(order.getAddress());
        message.setDeliveryTime(order.getDeliveryTime());

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
        message.setAddress(order.getAddress());
        message.setDeliveryTime(order.getDeliveryTime());

        publisher.sendOrderDelivered(message);
    }

    public List<OrderDTO> getAllOrders() {
    return repository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private OrderDTO convertToDTO(Order order) {
        List<OrderItemDTO> itemDTOs = order.getItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getId(),
                        item.getName(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getNotes()
                )).collect(Collectors.toList());

        return new OrderDTO(
                order.getOrderId(),
                order.getCustomerId(),
                order.getRestaurantId(),
                order.getRestaurantName(),
                order.getAddress(),
                order.getDeliveryTime(),
                itemDTOs,
                order.getStatus()
        );
    }
}