package com.foodieExpress.middleware_service.messaging;

import com.foodieExpress.middleware_service.dto.OrderMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class MessageListener {

    private final RestTemplate restTemplate;
    private static final Logger log = LoggerFactory.getLogger(MessageListener.class);

    public MessageListener(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RabbitListener(queues = "order.placed.queue")
    public void handleOrderPlaced(OrderMessage message) {
        log.info("Middleware received new order: {}", message);
        forwardTo("http://localhost:8082/api/restaurant/orders", message);
    }

    @RabbitListener(queues = "order.accepted.queue")
    public void handleOrderAccepted(OrderMessage message) {
        log.info("Middleware received order accepted: {}", message);
        forwardTo("http://localhost:8083/api/driver/assign", message);
    }

    @RabbitListener(queues = "order.ready.queue")
    public void handleOrderReady(OrderMessage message) {
        log.info("Middleware received order ready: {}", message);

        // Notify customer
        forwardTo("http://localhost:8081/api/customer/ready", message);

        // Notify driver with status update
        sendDriverStatus(message.getOrderId(), "READY_FOR_PICKUP");
    }

    @RabbitListener(queues = "order.pickedup.queue")
    public void handleOrderPickedUp(OrderMessage message) {
        log.info("Middleware received order picked up: {}", message);

        // Notify customer
        forwardTo("http://localhost:8081/api/customer/pickedup", message);

        // Update driver status
        sendDriverStatus(message.getOrderId(), "PICKED_UP");
    }

    @RabbitListener(queues = "order.delivered.queue")
    public void handleOrderDelivered(OrderMessage message) {
        log.info("Middleware received order delivered: {}", message);

        // Notify customer
        forwardTo("http://localhost:8081/api/customer/delivered", message);

        // Notify restaurant
        forwardTo("http://localhost:8082/api/restaurant/delivered", message);

        // Update driver status
        sendDriverStatus(message.getOrderId(), "DELIVERED");
    }

    @RabbitListener(queues = "order.delivery.queue")
    public void handleDeliveryStatus(OrderMessage message) {
        log.info("Middleware received delivery status: {}", message);

        forwardTo("http://localhost:8081/api/customer/status", message);
    }

    private void forwardTo(String url, OrderMessage message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderMessage> request = new HttpEntity<>(message, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Forwarded to {} with status {}", url, response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to forward to {}: {}", url, e.getMessage());
        }
    }

    private void sendDriverStatus(String orderId, String status) {
        try {
            String url = "http://localhost:8083/api/driver/status";
            Map<String, String> payload = new HashMap<>();
            payload.put("orderId", orderId);
            payload.put("status", status);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Driver status updated to {} for order {}: {}", status, orderId, response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to update driver status for order {}: {}", orderId, e.getMessage());
        }
    }
}
