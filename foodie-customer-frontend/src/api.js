
import axios from 'axios';
const BASE_URL = "http://localhost:8081/api";
export const placeOrder = async (orderData) => {
    const response = await axios.post(`${BASE_URL}/orders`, orderData);
    return response.data;
};

export const trackOrder = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/orders/status-only/${orderId}`);
    return response.data;
};
export const getOrderDetails = async (orderId) => {
    const response = await axios.get(`${BASE_URL}/orders/status/${orderId}`);
    return response.data;
};

export const getOrderStatus = async (orderId) => {
    const response = await axios.post(`${BASE_URL}/customer/status`, { orderId });
    return response.data;
};

