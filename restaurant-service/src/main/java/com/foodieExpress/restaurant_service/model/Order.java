package com.foodieExpress.restaurant_service.model;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "restaurant_orders")
public class Order implements Serializable {

    @Id
    @Column(name = "order_id")
    private String orderId;
    private String customerId;
    private String restaurantId;
    private String restaurantName;
    @Column(name = "address")
    private String address;

    @Column(name = "delivery_time")
    @Temporal(TemporalType.TIMESTAMP)
    private String deliveryTime;

    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "order_id"))
    @Column(name = "item")
    private List<OrderItem> items;

    @Column(name = "status")
    private String status;

    public Order(){}

    public Order(String orderId, String customerId, String restaurantId, String restaurantName, String address, List<OrderItem> items, String status, String deliveryTime) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.address = address;
        this.items = items;
        this.status = status;
        this.deliveryTime = deliveryTime;
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

    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliveryTime() {
    return deliveryTime;
}

    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }
}
