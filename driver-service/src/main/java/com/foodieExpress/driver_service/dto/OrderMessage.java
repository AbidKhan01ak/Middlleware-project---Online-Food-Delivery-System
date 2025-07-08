package com.foodieExpress.driver_service.dto;

public class OrderMessage {

    private String orderId;
    private String customerName;
    private String restaurantName;
    private String status;
    private String timestamp;

    public OrderMessage() {
    }

    public OrderMessage(String orderId, String customerName, String restaurantName, String status, String timestamp) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.restaurantName = restaurantName;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getters and setters

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}