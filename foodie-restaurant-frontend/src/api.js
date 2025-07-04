// src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/restaurant',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor (optional for global error handling)
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error.response || error.message);
        return Promise.reject(error);
    }
);
// API functions

// Get all accepted orders
export const fetchAcceptedOrders = async () => {
    const response = await api.get('/accepted-orders');
    return response.data;
};

// Mark an order as ready (fetch order from DB and send only orderId)
export const markOrderReady = async (orderId) => {
    const response = await api.post('/ready', {
        orderId: orderId
    });
    return response.data;
};

// Confirm that an order was delivered
export const confirmOrderDelivered = async (orderId) => {
    const response = await api.post('/delivered', {
        orderId: orderId
    });
    return response.data;
};

export default api;
