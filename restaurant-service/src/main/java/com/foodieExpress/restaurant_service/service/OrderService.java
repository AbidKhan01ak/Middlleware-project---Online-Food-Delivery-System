package com.foodieExpress.restaurant_service.service;
import com.foodieExpress.restaurant_service.model.Order;
import com.foodieExpress.restaurant_service.repository.OrderRepository;
import org.springframework.stereotype.Service;
import com.foodieExpress.restaurant_service.messaging.RabbitMQPublisher;
import com.foodieExpress.restaurant_service.dto.OrderMessage;
import com.foodieExpress.restaurant_service.dto.OrderDTO;
import com.foodieExpress.restaurant_service.dto.OrderItemDTO;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository repository;
    private final RabbitMQPublisher publisher;

    public OrderService(OrderRepository repository, RabbitMQPublisher publisher) {
        this.repository = repository;
        this.publisher = publisher;
    }

    public Order acceptOrder(String orderId) {
        Order order = repository.findById(orderId).orElseThrow();
        order.setStatus("ACCEPTED");
        repository.save(order);

        // NEW: Publish message to customer-service
        OrderMessage orderMessage = new OrderMessage();
        orderMessage.setOrderId(String.valueOf(order.getOrderId()));
        orderMessage.setCustomerId(String.valueOf(order.getCustomerId()));
        orderMessage.setRestaurantId(String.valueOf(order.getRestaurantId()));
        orderMessage.setStatus("ACCEPTED");
        orderMessage.setTimestamp(Instant.now().toString());
        orderMessage.setAddress(order.getAddress());
        orderMessage.setDeliveryTime(order.getDeliveryTime());

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
        Order order = repository.findById(orderId)
        .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus("accepted");
        repository.save(order);

        // Notify customer-service
        OrderMessage message = new OrderMessage();
        message.setOrderId(orderId);
        message.setStatus("ACCEPTED");
        publisher.sendOrderStatusUpdate(message);
    }
    public void markOrderAsPrepared(String orderId) {
        Order order = repository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setStatus("ready");
        repository.save(order);

        // Notify customer service
        OrderMessage orderMessage = new OrderMessage();
        orderMessage.setOrderId(orderId);
        orderMessage.setStatus("READY");
        publisher.sendOrderStatusUpdate(orderMessage);
    }

    public void markOrderReadyAndNotify(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus("READY");
        repository.save(order);

        OrderMessage message = new OrderMessage();
        message.setOrderId(String.valueOf(order.getOrderId()));
        message.setCustomerId(String.valueOf(order.getCustomerId()));
        message.setRestaurantId(String.valueOf(order.getRestaurantId()));
        message.setStatus("READY");
        message.setTimestamp(Instant.now().toString());
        message.setAddress(order.getAddress());
        message.setDeliveryTime(order.getDeliveryTime());

        publisher.sendOrderStatusUpdate(message);
    }

    public void confirmOrderDeliveredAndNotify(String orderId) {
        Order order = repository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        order.setStatus("delivered");
        repository.save(order);

        OrderMessage message = new OrderMessage();
        message.setOrderId(String.valueOf(order.getOrderId()));
        message.setCustomerId(String.valueOf(order.getCustomerId()));
        message.setRestaurantId(String.valueOf(order.getRestaurantId()));
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