// // src/api.js

// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:8083/api',
//     withCredentials: true,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// // Add a response interceptor (optional for global error handling)
// api.interceptors.response.use(
//     response => response,
//     error => {
//         console.error('API error:', error.response || error.message);
//         return Promise.reject(error);
//     }
// );

// export const fetchAssignedOrders = async () => {
//     const response = await api.get('/orders');
//     return response.data;
// };

// export const assignOrderToDriver = async (order) => {
//     const response = await api.post('/assign', order);
//     return response.data;
// };

// export const updateDeliveryStatus = async (statusObj) => {
//     const response = await api.post('/status', statusObj);
//     return response.data;
// };
// export default api;

// src/api.js

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8083/api/driver",
    headers: {
        "Content-Type": "application/json",
    },
});

// Fetch assigned orders
export const fetchAssignedOrders = () => api.get("/orders");

// Update delivery status
export const updateDeliveryStatus = (statusPayload) =>
    api.post("/status", statusPayload);

export default api;
