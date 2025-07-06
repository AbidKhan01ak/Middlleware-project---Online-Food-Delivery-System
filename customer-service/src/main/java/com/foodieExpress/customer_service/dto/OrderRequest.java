package com.foodieExpress.customer_service.dto;

import java.util.List;

import com.foodieExpress.customer_service.model.OrderItem;

public class OrderRequest {

    private String customerId;
    private String restaurantId;
    private String restaurantName;
    private String address;
    private List<OrderItem> items;

    public OrderRequest() {}
    public OrderRequest(String customerId, String restaurantId, String restaurantName, String address, List<OrderItem> items) {
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.address = address;
        this.items = items;
    }
    // Getter and Setter for customerId
    public String getCustomerId() {
        return customerId;
    }
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    // Getter and Setter for restaurantId
    public String getRestaurantId() {
        return restaurantId;
    }
    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    // Getter and Setter for restaurantName
    public String getRestaurantName() {
        return restaurantName;
    }
    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    // Getter and Setter for address
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }

    // Getter and Setter for items
    public List<OrderItem> getItems() {
        return items;
    }
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

}
