package com.foodieExpress.customer_service.model;

import com.foodieExpress.customer_service.dto.OrderRequest;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @Column(name = "order_id", nullable = false, length = 36)
    private String orderId;
    private String customerId;
    private String restaurantId;
    private String address;

    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    @Column(name = "item")
    private List<String> items;
    private String status;

    public Order() {}

    public Order(String orderId, String customerId, String restaurantId, String address, List<String> items, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.address = address;
        this.items = items;
        this.status = status;
    }

    public static Order fromRequest(OrderRequest request){
        return new Order(
                UUID.randomUUID().toString(),
                request.getCustomerId(),
                request.getRestaurantId(),
                request.getAddress(),
                request.getItems(),
                "PLACED"
        );
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
