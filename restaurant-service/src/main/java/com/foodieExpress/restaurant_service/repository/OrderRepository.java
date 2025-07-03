package com.foodieExpress.restaurant_service.repository;

import com.foodieExpress.restaurant_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {
}
