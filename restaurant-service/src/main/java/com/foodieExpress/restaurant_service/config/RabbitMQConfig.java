package com.foodieExpress.restaurant_service.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "order.exchange";
    public static final String QUEUE = "order.placed.queue";
    public static final String ROUTING_KEY = "order.placed";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue orderPlacedQueue() {
        return new Queue(QUEUE);
    }

    @Bean
    public Binding orderPlacedBinding() {
        return BindingBuilder
                .bind(orderPlacedQueue())
                .to(exchange())
                .with(ROUTING_KEY);
    }

    @Bean
    public Queue orderDeliveredQueue() {
        return new Queue("order.delivered.queue", true);
    }

    @Bean
    public Binding orderDeliveredBinding() {
        return BindingBuilder.bind(orderDeliveredQueue())
                .to(exchange())
                .with("order.delivered");
    }

    @Bean
    public Jackson2JsonMessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jackson2JsonMessageConverter());
        return template;
    }
}
