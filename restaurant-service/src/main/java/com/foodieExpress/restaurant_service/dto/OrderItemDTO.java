package com.foodieExpress.restaurant_service.dto;

public class OrderItemDTO {
    private String id;
    private String name;
    private int quantity;
    private double price;
    private String notes;

    public OrderItemDTO() {}

    public OrderItemDTO(String id, String name, int quantity, double price, String notes) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.notes = notes;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    
}
