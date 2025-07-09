import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/restaurant',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    response => response,
    error => {
        console.error('API error:', error.response || error.message);
        return Promise.reject(error);
    }
);

export const fetchAcceptedOrders = async () => {
    const response = await api.get('/accepted-orders');
    return response.data;
};

export const markOrderAccepted = async (orderId) => {
    const response = await api.post('/accepted', { orderId });
    return response.data;
};

export const markOrderReady = async (orderId) => {
    const response = await api.post('/ready', {
        orderId
    });
    return response.data;
};


export const confirmOrderDelivered = async (orderId) => {
    const response = await api.post('/delivered', {
        orderId
    });
    return response.data;
};

export const getAllOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export const sendOrderToRestaurant = async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
};

export default api;