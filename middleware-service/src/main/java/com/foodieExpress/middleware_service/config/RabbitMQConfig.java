package com.foodieExpress.middleware_service.config;
import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RabbitMQConfig {
    public static final String EXCHANGE = "order.exchange";

    public static final String ORDER_PLACED_QUEUE = "order.placed.queue";
    public static final String ORDER_ACCEPTED_QUEUE = "order.accepted.queue";
    public static final String DELIVERY_STATUS_QUEUE = "order.delivery.queue";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue orderPlacedQueue() {
        return new Queue(ORDER_PLACED_QUEUE);
    }

    @Bean
    public Queue orderAcceptedQueue() {
        return new Queue(ORDER_ACCEPTED_QUEUE);
    }

    @Bean
    public Queue deliveryStatusQueue() {
        return new Queue(DELIVERY_STATUS_QUEUE);
    }

    @Bean
    public Binding bindingOrderPlaced() {
        return BindingBuilder.bind(orderPlacedQueue()).to(exchange()).with("order.placed");
    }

    @Bean
    public Binding bindingOrderAccepted() {
        return BindingBuilder.bind(orderAcceptedQueue()).to(exchange()).with("order.accepted");
    }

    @Bean
    public Binding bindingDeliveryStatus() {
        return BindingBuilder.bind(deliveryStatusQueue()).to(exchange()).with("order.delivery");
    }

    @Bean
    public Queue orderReadyQueue() {
        return new Queue("order.ready.queue", true);
    }

    @Bean
    public Queue orderPickedUpQueue() {
        return new Queue("order.pickedup.queue", true);
    }

    @Bean
    public Queue orderDeliveredQueue() {
        return new Queue("order.delivered.queue", true);
    }

    @Bean
    public Binding orderReadyBinding() {
        return BindingBuilder.bind(orderReadyQueue()).to(exchange()).with("order.ready");
    }

    @Bean
    public Binding orderPickedUpBinding() {
        return BindingBuilder.bind(orderPickedUpQueue()).to(exchange()).with("order.pickedup");
    }

    @Bean
    public Binding orderDeliveredBinding() {
        return BindingBuilder.bind(orderDeliveredQueue()).to(exchange()).with("order.delivered");
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
