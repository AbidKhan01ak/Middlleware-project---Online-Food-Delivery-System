package com.foodieExpress.customer_service.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.foodieExpress.customer_service.model.OrderItem;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderResponse {

    private String message;
    private String orderId;
    private String restaurantName;  
    private String address;   
    private double totalPrice;
    private List<OrderItem> items;     
    private String status; 
    private String estimatedDeliveryTime;

    public OrderResponse(){}

    public OrderResponse(String message, String orderId, String restaurantName, String address,double totalPrice, List<OrderItem>items,String status) {
    this.message = message;
    this.orderId = orderId;
    this.restaurantName = restaurantName;
    this.address = address;
    this.totalPrice = totalPrice;
    this.items = items;
    this.status = status;
}

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
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

    public void setAddress(String address){
        this.address = address;
    }

    public double getTotalPrice() {
        return totalPrice + 30 + (totalPrice * 0.08);
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
    
    public List<OrderItem> getItems(){
        return items;
    }
    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public String getEstimatedDeliveryTime() {
        return estimatedDeliveryTime; // Static 30-minute delivery time for demo
    }

    public void setEstimatedDeliveryTime(String estimatedDeliveryTime) {
        this.estimatedDeliveryTime = estimatedDeliveryTime;
    }
}
