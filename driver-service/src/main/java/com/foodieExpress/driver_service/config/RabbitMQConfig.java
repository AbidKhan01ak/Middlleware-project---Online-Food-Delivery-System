package com.foodieExpress.driver_service.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String ORDER_ASSIGN_EXCHANGE = "order.assign.exchange";
    public static final String ORDER_ASSIGN_QUEUE = "order.assigned.queue";
    public static final String ORDER_ASSIGN_ROUTING_KEY = "order.assigned";

    public static final String ORDER_STATUS_EXCHANGE = "order.status.exchange";
    public static final String ORDER_STATUS_ROUTING_KEY = "order.status.updated";

    @Bean
    public Queue orderAssignedQueue() {
        return new Queue(ORDER_ASSIGN_QUEUE);
    }

    @Bean
    public TopicExchange orderAssignExchange() {
        return new TopicExchange(ORDER_ASSIGN_EXCHANGE);
    }

    @Bean
    public Binding assignBinding() {
        return BindingBuilder
                .bind(orderAssignedQueue())
                .to(orderAssignExchange())
                .with(ORDER_ASSIGN_ROUTING_KEY);
    }

    @Bean
    public TopicExchange orderStatusExchange() {
        return new TopicExchange(ORDER_STATUS_EXCHANGE);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory) {
        RabbitTemplate template = new RabbitTemplate(factory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
