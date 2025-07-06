import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  MapPin,
  Clock,
  Package,
  CheckCircle,
  Navigation,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface Order {
  id: string;
  customerName: string;
  customerAddress: string;
  items: string[];
  totalAmount: number;
  status: "assigned" | "picked_up" | "en_route" | "delivered";
  orderTime: string;
  estimatedDeliveryTime: string;
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for demonstration since we don't have a real API
  const mockOrders: Order[] = [
    {
      id: "1",
      customerName: "John Smith",
      customerAddress: "123 Main St, Downtown",
      items: ["Burger Deluxe", "Fries", "Coke"],
      totalAmount: 24.99,
      status: "assigned",
      orderTime: "2:30 PM",
      estimatedDeliveryTime: "3:15 PM",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      customerAddress: "456 Oak Ave, Uptown",
      items: ["Pizza Margherita", "Garlic Bread"],
      totalAmount: 18.5,
      status: "picked_up",
      orderTime: "2:45 PM",
      estimatedDeliveryTime: "3:30 PM",
    },
    {
      id: "3",
      customerName: "Mike Davis",
      customerAddress: "789 Pine Rd, Midtown",
      items: ["Chicken Tikka", "Rice", "Naan"],
      totalAmount: 32.0,
      status: "en_route",
      orderTime: "3:00 PM",
      estimatedDeliveryTime: "3:45 PM",
    },
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // In a real app, this would be: const response = await axios.get('/api/driver/orders');
      // For now, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOrders(mockOrders);
      console.log("Orders fetched successfully");
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingStatus(orderId);
      console.log(`Updating order ${orderId} to status: ${newStatus}`);

      // In a real app, this would be:
      // await axios.post(`/api/driver/order/${orderId}/status`, { status: newStatus });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: newStatus as Order["status"] }
            : order
        )
      );

      toast({
        title: "Status Updated",
        description: `Order ${orderId} status updated to ${newStatus.replace(
          "_",
          " "
        )}`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "assigned":
        return "bg-orange-500";
      case "picked_up":
        return "bg-blue-500";
      case "en_route":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "assigned":
        return <Package className="w-4 h-4" />;
      case "picked_up":
        return <Truck className="w-4 h-4" />;
      case "en_route":
        return <Navigation className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getNextStatusActions = (currentStatus: Order["status"]) => {
    switch (currentStatus) {
      case "assigned":
        return [
          {
            status: "picked_up",
            label: "Mark as Picked Up",
            color: "bg-blue-500 hover:bg-blue-600",
          },
        ];
      case "picked_up":
        return [
          {
            status: "en_route",
            label: "Start Delivery",
            color: "bg-purple-500 hover:bg-purple-600",
          },
        ];
      case "en_route":
        return [
          {
            status: "delivered",
            label: "Mark as Delivered",
            color: "bg-green-500 hover:bg-green-600",
          },
        ];
      case "delivered":
        return [];
      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Truck className="w-12 h-12 text-blue-500 animate-bounce mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">
            Loading your deliveries...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Driver Dashboard
                </h1>
                <p className="text-sm text-gray-600">Manage your deliveries</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {orders.filter((o) => o.status !== "delivered").length} Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="container mx-auto px-4 py-6 space-y-4">
        {orders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Orders Available
              </h3>
              <p className="text-gray-600">
                Check back later for new delivery assignments.
              </p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card
              key={order.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-200 border-0"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </CardTitle>
                  <Badge
                    className={`${getStatusColor(order.status)} text-white`}
                  >
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">
                        {order.status.replace("_", " ")}
                      </span>
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.customerAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Items:
                  </p>
                  <p className="text-sm text-gray-600">
                    {order.items.join(", ")}
                  </p>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="font-semibold text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Time Info */}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Ordered: {order.orderTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>ETA: {order.estimatedDeliveryTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  {getNextStatusActions(order.status).map((action) => (
                    <Button
                      key={action.status}
                      onClick={() => updateOrderStatus(order.id, action.status)}
                      disabled={updatingStatus === order.id}
                      className={`flex-1 ${action.color} text-white transition-all duration-200 hover:scale-105`}
                    >
                      {updatingStatus === order.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </div>
                      ) : (
                        action.label
                      )}
                    </Button>
                  ))}
                  {order.status === "delivered" && (
                    <div className="flex-1 bg-green-100 text-green-800 px-4 py-2 rounded-md text-center font-medium">
                      ✓ Completed
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Index;
