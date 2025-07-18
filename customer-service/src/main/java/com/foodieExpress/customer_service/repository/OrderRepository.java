package com.foodieExpress.customer_service.repository;

import com.foodieExpress.customer_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, String> {

    Optional<Order> findByOrderId(String orderId);
}
