import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8083/api/driver",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchAssignedOrders = () => api.get("/orders");

export const updateDeliveryStatus = (statusPayload) =>
    api.post("/status", statusPayload);

export default api;
