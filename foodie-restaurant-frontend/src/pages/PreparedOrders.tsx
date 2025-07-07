// src/pages/PreparedOrders.tsx

import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Order } from "../types/order";
import { toast } from "@/components/ui/use-toast";

const PreparedOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreparedOrders = async () => {
      try {
        const allOrders = await getAllOrders();
        const filteredOrders = allOrders.filter(
          (order) =>
            order.status?.toUpperCase() === "PREPARED" ||
            order.status?.toUpperCase() === "READY"
        );
        setOrders(filteredOrders);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch prepared orders",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPreparedOrders();
  }, []);

  if (loading) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Prepared Orders</h1>
      {orders.map((order) => (
        <Card key={order.orderId} className="mb-4">
          <CardHeader>
            <h2 className="text-lg font-semibold">Order ID: {order.orderId}</h2>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Restaurant:</strong> {order.restaurantName}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PreparedOrders;
