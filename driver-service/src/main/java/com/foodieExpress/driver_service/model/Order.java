package com.foodieExpress.driver_service.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @Column(name = "order_id")
    private String orderId;
    private String customerId;
    private String restaurantName;

    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id"))
    private List<OrderItem> items;
    private String status;

    public Order(){}

    public Order(String orderId, String customerId, String restaurantName, List<OrderItem> items, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.restaurantName = restaurantName;
        this.items = items;
        this.status = status;
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

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
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

    public String getCustomerName() {
        return "Abid Khan"; // Assuming customerId is the name for simplicity
    }

    public String getCustomerAddress() {
        return "210, Gandhi Nagar, Bengaluru"; 
    }

    // Returns current time in 12-hour format (hh:mm a)
    public String getOrderTime() {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("hh:mm a");
        return sdf.format(new java.util.Date());
    }

    public String getEstimatedDeliveryTime() {
        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("hh:mm a");
        java.util.Date now = new java.util.Date();
        long estimatedTime = now.getTime() + 30 * 60 * 1000; // Adding 30 minutes
        return sdf.format(new java.util.Date(estimatedTime));
    }
}
