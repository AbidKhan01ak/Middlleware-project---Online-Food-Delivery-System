// src/pages/AcceptedOrders.tsx

import React, { useEffect, useState } from "react";
import { fetchAcceptedOrders } from "../api";
import { Order } from "../types/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AcceptedOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAcceptedOrders = async () => {
      try {
        const data = await fetchAcceptedOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching accepted orders:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAcceptedOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accepted Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No accepted orders.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <Card key={order.orderId} className="border-green-500 border-l-4">
              <CardHeader>
                <CardTitle>Order ID: {order.orderId}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Customer:</strong> {order.customerId}
                </p>
                <p>
                  <strong>Restaurant:</strong> {order.restaurantName}
                </p>
                <p>
                  <strong>Address:</strong> {order.address}
                </p>
                <p>
                  <strong>Delivery Time:</strong> {order.deliveryTime || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedOrders;
