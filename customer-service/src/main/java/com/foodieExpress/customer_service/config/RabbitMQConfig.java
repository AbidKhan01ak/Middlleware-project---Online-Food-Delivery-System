package com.foodieExpress.customer_service.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "order.exchange";
    public static final String ROUTING_KEY_PLACED = "order.placed";

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE);
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
        return BindingBuilder.bind(orderReadyQueue())
                .to(exchange())
                .with("order.ready");
    }

    @Bean
    public Binding orderPickedUpBinding() {
        return BindingBuilder.bind(orderPickedUpQueue())
                .to(exchange())
                .with("order.pickedup");
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
