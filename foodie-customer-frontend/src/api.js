// src/api.js

import axios from 'axios';
const BASE_URL = "http://localhost:8081/api"; //Base URL for customer-service backend
// 🛒 Place a new order
export const placeOrder = async (orderData) => {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
};

// 🚚 Track the order by orderId
// export const trackOrder = async (orderId) => {
//     const response = await axios.post(`${BASE_URL}/orders/status`, { orderId });
//     return response.data;
// };

export const trackOrder = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/orders/status-only/${orderId}`);
    return response.data; // Will return: { status: "accepted" }
};
export const getOrderDetails = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/orders/status/${orderId}`);
    return response.data;
};
// 📩 Fetch order updates
export const getOrderStatus = async (orderId) => {
    const response = await axios.post(`${BASE_URL}/customer/status`, { orderId });
    return response.data;
};

