package com.foodieExpress.driver_service.Repository;

import com.foodieExpress.driver_service.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    List<Order> findByStatusIgnoreCase(String status);
}