package com.foodieExpress.driver_service.dto;

import java.util.List;

public class DriverOrderDTO {

    private String id;
    private String customerName;
    private String customerAddress;
    private String restaurantName; // Added restaurant name
    private Double totalAmount;
    private List<OrderItemDTO> items;
    private String status;
    private String orderTime;
    private String estimatedDeliveryTime;

    public DriverOrderDTO() {
    }

    public DriverOrderDTO(String id, String customerName, String customerAddress, String restaurantName, Double totalAmount, List<OrderItemDTO> items, String status, String orderTime, String estimatedDeliveryTime) {
        this.id = id;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.restaurantName = restaurantName; // Initialize restaurant name
        this.totalAmount = totalAmount;
        this.items = items;
        this.status = status;
        this.orderTime = orderTime;
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public String getCustomerAddress() {
        return customerAddress;
    }
    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }
    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }
    public Double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
    public List<OrderItemDTO> getItems() {
        return items;
    }
    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getOrderTime() {
        return orderTime;
    }
    public void setOrderTime(String orderTime) {
        this.orderTime = orderTime;
    }
    public String getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }
    public void setEstimatedDeliveryTime(String estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }

}