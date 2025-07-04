import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { OrderCard } from "@/components/OrderCard";
import { mockOrders } from "@/lib/mockData";
import { Order, OrderStatus } from "@/types/order";

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock API call to fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // Simulating API call delay
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      // Mock API call - in real app, this would be:
      // await axios.post(`/api/restaurant/order/${orderId}/status`, { status });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );

      const statusMessages = {
        accepted: "Order accepted successfully!",
        rejected: "Order rejected",
        prepared: "Order marked as prepared!",
      };

      toast({
        title: "Status Updated",
        description: statusMessages[status],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getOrderStats = () => {
    const pending = orders.filter((order) => order.status === "pending").length;
    const accepted = orders.filter(
      (order) => order.status === "accepted"
    ).length;
    const prepared = orders.filter(
      (order) => order.status === "prepared"
    ).length;

    return { pending, accepted, prepared };
  };

  const stats = getOrderStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-orange-200 rounded-full mx-auto mb-4"></div>
            <p className="text-orange-600 font-medium">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Restaurant Portal
          </h1>
          <p className="text-gray-600">Manage your incoming orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Accepted Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.accepted}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Prepared Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.prepared}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
            />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No orders available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
