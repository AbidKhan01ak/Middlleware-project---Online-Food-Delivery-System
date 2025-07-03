package com.foodieExpress.middleware_service.messaging;
import com.foodieExpress.middleware_service.dto.OrderMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



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
        try {
            String url = "http://localhost:8082/api/restaurant/orders";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderMessage> request = new HttpEntity<>(message, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Forwarded order to restaurant. Status: {}", response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to forward order to restaurant-service", e);
        }
    }

    @RabbitListener(queues = "order.accepted.queue")
    public void handleOrderAccepted(OrderMessage message) {
        log.info("Middleware received order accepted: {}", message);
        //route it to driver
        try {
            String url = "http://localhost:8083/api/driver/assign";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderMessage> request = new HttpEntity<>(message, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Forwarded assignment to driver. Status: {}", response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to forward to driver-service", e);
        }
    }

    @RabbitListener(queues = "order.delivery.queue")
    public void handleDeliveryStatus(OrderMessage message) {
        log.info("Middleware received delivery status: {}", message);
        //route it back to customer

        try {
            String url = "http://localhost:8081/api/customer/status";
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderMessage> request = new HttpEntity<>(message, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Forwarded delivery status to customer. Status: {}", response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to forward to customer-service", e);
        }
    }

    @RabbitListener(queues = "order.ready.queue")
    public void handleOrderReady(OrderMessage message) {
        log.info("Middleware received order ready message: {}", message);
        // Notify customer and driver
        forwardTo("http://localhost:8081/api/customer/ready", message); // Customer
        forwardTo("http://localhost:8083/api/driver/ready", message);   // Driver
    }

    @RabbitListener(queues = "order.pickedup.queue")
    public void handleOrderPickedUp(OrderMessage message) {
        log.info("Middleware received order picked up: {}", message);
        // Notify customer
        forwardTo("http://localhost:8081/api/customer/pickedup", message);
    }

    @RabbitListener(queues = "order.delivered.queue")
    public void handleOrderDelivered(OrderMessage message) {
        log.info("Middleware received order delivered: {}", message);
        // Notify customer and restaurant
        forwardTo("http://localhost:8081/api/customer/delivered", message);
        forwardTo("http://localhost:8082/api/restaurant/delivered", message);
    }

    private void forwardTo(String url, OrderMessage message) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderMessage> request = new HttpEntity<>(message, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
            log.info("Successfully forwarded to {} - Status: {}", url, response.getStatusCode());
        } catch (Exception e) {
            log.error("Failed to forward to {}", url, e);
        }
    }
}
