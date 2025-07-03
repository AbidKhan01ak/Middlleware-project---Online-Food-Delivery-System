package com.foodieExpress.driver_service.model;

import java.io.Serializable;
import java.util.List;

public class Order implements Serializable {

    private String orderId;
    private String customerName;
    private String restaurantName;
    private List<String> items;
    private String deliveryAddress;

    public Order(){}

    public Order(String orderId, String customerName, String restaurantName, List<String> items, String deliveryAddress) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.restaurantName = restaurantName;
        this.items = items;
        this.deliveryAddress = deliveryAddress;
    }

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

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}
