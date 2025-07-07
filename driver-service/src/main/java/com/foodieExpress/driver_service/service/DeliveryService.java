package com.foodieExpress.driver_service.service;

import java.time.Instant;
import java.util.List;

import java.util.stream.Collectors;
import com.foodieExpress.driver_service.dto.DriverOrderDTO;
import com.foodieExpress.driver_service.dto.OrderItemDTO;
import com.foodieExpress.driver_service.messaging.OrderAssignmentListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.foodieExpress.driver_service.model.Order;
import com.foodieExpress.driver_service.messaging.StatusUpdatePublisher;
import com.foodieExpress.driver_service.model.DeliveryStatus;
import com.foodieExpress.driver_service.Repository.OrderRepository;
import com.foodieExpress.driver_service.dto.OrderMessage;
import org.springframework.amqp.core.MessageListener;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {

    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);
    
    private final StatusUpdatePublisher publisher;
    // private final OrderAssignmentListener assignmentListener;
    private final OrderRepository orderRepository;

    public DeliveryService(StatusUpdatePublisher publisher, OrderAssignmentListener assignmentListener, OrderRepository orderRepository) {
        this.publisher = publisher;
        // this.assignmentListener = assignmentListener;
        this.orderRepository = orderRepository;
    }

    public void assignOrder(Order order) {
    // Already handled in listener
    System.out.println("Order assigned to driver: " + order);
    }

    public void updateStatus(DeliveryStatus status) {
        log.info("Driver updated status: {}", status.getStatus());
        String timestamp = Instant.now().toString();
        OrderMessage message = new OrderMessage(
        status.getOrderId(),
        status.getCustomerId(),
        status.getRestaurantId(),
        status.getStatus(),
        timestamp
    );


        switch (status.getStatus().toLowerCase()) {
            case "pickedup" -> publisher.sendOrderPickedUp(message);
            case "En-route" -> publisher.sendOrderEnRoute(message);
            case "delivered" -> publisher.sendOrderDelivered(message);
        }
    }

    public List<DriverOrderDTO> getAssignedOrders() {
        List<Order> orders = orderRepository.findByStatusIgnoreCase("ready");

        return orders.stream().map(order -> {
            List<OrderItemDTO> itemDTOs = order.getItems().stream()
                    .map(item -> new OrderItemDTO(
                            item.getId(),
                            item.getName(),
                            item.getPrice(),
                            item.getQuantity()))
                    .collect(Collectors.toList());

            double totalAmount = itemDTOs.stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();

            return new DriverOrderDTO(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getCustomerAddress(),
                    totalAmount,
                    itemDTOs,
                    order.getStatus(),
                    order.getOrderTime(),
                    order.getEstimatedDeliveryTime()
            );
        }).collect(Collectors.toList());
    }
}
