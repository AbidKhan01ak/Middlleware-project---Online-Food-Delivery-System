import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};

export const sendStatusUpdate = async (statusData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/orders/status`, statusData);
        console.log("Sending status update to:", `${API_BASE_URL}/orders/status`);
        console.log("Status data:", statusData);
        return response.data;
    } catch (error) {
        console.error('Error sending status update:', error);
        throw error;
    }
};
