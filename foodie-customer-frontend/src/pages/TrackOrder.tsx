import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  placeOrder,
  trackOrder,
  getOrderStatus,
  getOrderDetails,
} from "../api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { restaurants } from "../lib/mockData"; // Assuming this is where your restaurant data is stored

interface OrderStatus {
  id: string;
  status:
    | "placed"
    | "accepted"
    | "preparing"
    | "ready_for_pickup"
    | "out_for_delivery"
    | "delivered";
  estimatedDeliveryTime: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryAddress: string;
  restaurantName: string;
}

const TrackOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [localStatusTimeout, setLocalStatusTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const [simulatedStatus, setSimulatedStatus] = useState<
    OrderStatus["status"] | null
  >(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    let interval: NodeJS.Timeout;

    const fetchOrderStatus = async () => {
      try {
        const [statusData, detailsData] = await Promise.all([
          trackOrder(orderId),
          getOrderDetails(orderId),
        ]);

        const backendStatus = statusData.status?.toLowerCase() || "placed";

        // Set simulated "preparing" after 15s if accepted
        if (
          backendStatus === "accepted" &&
          simulatedStatus === null &&
          !localStatusTimeout
        ) {
          const timeout = setTimeout(() => {
            setSimulatedStatus("preparing");
          }, 15000);
          setLocalStatusTimeout(timeout);
        }

        // Stop simulation if backend status progressed
        if (
          backendStatus !== "accepted" &&
          (simulatedStatus !== null || localStatusTimeout)
        ) {
          setSimulatedStatus(null);
          if (localStatusTimeout) {
            clearTimeout(localStatusTimeout);
            setLocalStatusTimeout(null);
          }
        }

        const effectiveStatus = simulatedStatus || backendStatus;

        const mappedOrder: OrderStatus = {
          id: orderId,
          status: effectiveStatus,
          estimatedDeliveryTime: new Date(
            statusData.estimatedDeliveryTime ?? Date.now() + 30 * 60 * 1000
          ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          items: (detailsData.items ?? []).map((item: any) => ({
            name: item.name ?? "Item",
            quantity: item.quantity ?? 1,
            price: item.price ?? 0,
          })),
          totalAmount: detailsData.totalPrice ?? 0,
          deliveryAddress:
            detailsData.address ?? "210, Gandhi Nagar, Bengaluru",
          restaurantName: detailsData.restaurantName ?? "Unknown",
        };

        setOrderStatus(mappedOrder);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order status:", err);
      }
    };

    fetchOrderStatus(); // initial
    interval = setInterval(fetchOrderStatus, 3000); // poll

    return () => {
      clearInterval(interval);
      if (localStatusTimeout) clearTimeout(localStatusTimeout);
    };
  }, [orderId, simulatedStatus, localStatusTimeout]);

  const getStatusColor = (status: OrderStatus["status"]) => {
    switch (status) {
      case "placed":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-orange-100 text-orange-800";
      case "ready_for_pickup":
        return "bg-purple-100 text-purple-800";
      case "out_for_delivery":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusMessage = (status: OrderStatus["status"]) => {
    switch (status) {
      case "placed":
        return "Order placed successfully!";
      case "accepted":
        return "Restaurant confirmed your order";
      case "preparing":
        return "Your food is being prepared";
      case "ready_for_pickup":
        return "Order ready for pickup";
      case "out_for_delivery":
        return "Your order is on the way!";
      case "delivered":
        return "Order delivered successfully!";
      default:
        return "Processing your order...";
    }
  };

  const getStatusSteps = () => {
    const steps = [
      { key: "placed", label: "Order Placed", icon: "📝" },
      { key: "accepted", label: "Accepted", icon: "✅" },
      { key: "preparing", label: "Preparing", icon: "👨‍🍳" },
      { key: "ready_for_pickup", label: "Ready", icon: "📦" },
      { key: "out_for_delivery", label: "On the Way", icon: "🚚" },
      { key: "delivered", label: "Delivered", icon: "🎉" },
    ];

    const currentIndex = steps.findIndex(
      (step) => step.key === orderStatus?.status
    );

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading order status...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!orderStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order not found
          </h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-600">Order #{orderStatus.id}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Order Status</h2>
                  <Badge className={getStatusColor(orderStatus.status)}>
                    {getStatusMessage(orderStatus.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusSteps.map((step, index) => (
                    <div key={step.key} className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : step.active
                            ? "bg-orange-500 text-white animate-pulse"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <p
                          className={`font-medium ${
                            step.completed || step.active
                              ? "text-gray-900"
                              : "text-gray-500"
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.completed &&
                          step.key !== orderStatus.status &&
                          "✓"}
                        {step.active && "In Progress"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Delivery Information</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Estimated Delivery:</strong>{" "}
                    {orderStatus.estimatedDeliveryTime}
                  </p>
                  <p>
                    <strong>Delivery Address:</strong>{" "}
                    {orderStatus.deliveryAddress}
                  </p>
                  <p>
                    <strong>Restaurant:</strong> {orderStatus.restaurantName}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderStatus.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderStatus.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link to="/">
                    <Button className="w-full">Order Again</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
