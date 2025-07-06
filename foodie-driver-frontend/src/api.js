// src/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8085/api',
    withCredentials: true,
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

export default api;
