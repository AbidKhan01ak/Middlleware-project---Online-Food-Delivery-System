package com.foodieExpress.customer_service.model;

import com.foodieExpress.customer_service.dto.OrderRequest;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @Column(name = "order_id", nullable = false, updatable = false)
    private String orderId;
    private String customerId;
    private String restaurantId;

    @Column
    private String restaurantName;
    private String address;
    private double totalPrice;
    @ElementCollection
    @CollectionTable(name = "order_items", joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "order_id"))
    @Column(name = "item")
    private List<OrderItem> items;

    private String status;

    public Order() {}

    public Order(String orderId, String customerId, String restaurantId, String restaurantName, String address, double totalPrice, List<OrderItem> items, String status) {
        this.orderId = orderId;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.address = address;
        this.totalPrice = totalPrice;
        this.items = items;
        this.status = status;
    }

    public static Order fromRequest(OrderRequest request){
        List<OrderItem> orderItems = request.getItems().stream()
        .map(dto -> new OrderItem(dto.getItemId(), dto.getName(), dto.getQuantity(), dto.getPrice()))
        .collect(Collectors.toList());

        double totalPrice = request.getItems().stream()
        .mapToDouble(item -> item.getPrice() * item.getQuantity())
        .sum();
        return new Order(
                UUID.randomUUID().toString(),
                request.getCustomerId(),
                request.getRestaurantId(),
                request.getRestaurantName(),
                request.getAddress(),
                totalPrice,
                orderItems,
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

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
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
}
