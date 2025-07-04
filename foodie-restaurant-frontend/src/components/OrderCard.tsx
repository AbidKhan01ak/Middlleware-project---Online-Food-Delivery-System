import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/order";
import { Clock, User, Phone } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderCard = ({ order, onUpdateStatus }: OrderCardProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "prepared":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              Order #{order.id}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formatTime(order.orderTime)}</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(order.status)} capitalize`}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{order.customerName}</span>
          </div>
          {order.customerPhone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {order.customerPhone}
              </span>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Items:</h4>
          <div className="space-y-1">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <span>
                  {item.quantity}x {item.name}
                  {item.notes && (
                    <span className="text-gray-500 ml-1">({item.notes})</span>
                  )}
                </span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>Total:</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          {order.status === "pending" && (
            <div className="flex gap-2">
              <Button
                onClick={() => onUpdateStatus(order.id, "accepted")}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>
              <Button
                onClick={() => onUpdateStatus(order.id, "rejected")}
                variant="destructive"
                className="flex-1"
              >
                Reject
              </Button>
            </div>
          )}

          {order.status === "accepted" && (
            <Button
              onClick={() => onUpdateStatus(order.id, "prepared")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Mark as Prepared
            </Button>
          )}

          {order.status === "prepared" && (
            <div className="text-center py-2">
              <span className="text-green-600 font-medium">
                ✓ Ready for pickup
              </span>
            </div>
          )}

          {order.status === "rejected" && (
            <div className="text-center py-2">
              <span className="text-red-600 font-medium">Order rejected</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
