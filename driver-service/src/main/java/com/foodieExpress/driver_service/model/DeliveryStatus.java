package com.foodieExpress.driver_service.model;

public class DeliveryStatus {

    private String orderId;
    private String customerId;
    private String restaurantId;
    private String status; // e.g., "pickedup", "en-route", "delivered"

    public DeliveryStatus() {
    }

    public DeliveryStatus(String orderId, String customerId, String restaurantId, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
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

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
