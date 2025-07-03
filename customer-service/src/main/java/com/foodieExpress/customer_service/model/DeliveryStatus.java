package com.foodieExpress.customer_service.model;

public class DeliveryStatus {
    private String orderId;
    private String status;
    
    public DeliveryStatus(String orderId, String status) {
        this.orderId = orderId;
        this.status = status;
    }
    
    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "DeliveryStatus{" +
                "orderId='" + orderId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
