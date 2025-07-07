import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order, OrderStatus } from "@/types/order";
import { Clock, Store, MapPin } from "lucide-react";

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderCard = ({ order, onUpdateStatus }: OrderCardProps) => {
  const normalizedStatus = order.status.toUpperCase() as OrderStatus;
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-100 text-green-800 border-green-200";
      case "PREPARED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTime = (timeString: string) => {
    const time = new Date(timeString);
    // If the date is invalid, use current time + 30 minutes
    const validTime = isNaN(time.getTime())
      ? new Date(Date.now() + 30 * 60 * 1000)
      : time;
    return validTime.toLocaleTimeString("en-US", {
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
              Order #{order.orderId}
            </CardTitle>
            {/* 🏠 Address */}
            {order.address && (
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                <MapPin size={14} /> {order.address}
              </p>
            )}
            {/* 🍽 Restaurant */}
            {order.restaurantName && (
              <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <Store size={14} /> {order.restaurantName}
              </div>
            )}
            {/* 🕐 Delivery Time */}
            {order.deliveryTime && (
              <div className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                <Clock size={14} /> Delivery at:{" "}
                {formatTime(order.deliveryTime)}
              </div>
            )}
          </div>
          {/* 🔖 Status */}
          <Badge className={`${getStatusColor(normalizedStatus)} capitalize`}>
            {normalizedStatus}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Items:</h4>
          <div className="space-y-1">
            <ul className="list-disc list-inside text-sm text-gray-700">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-700">
                  • {item.name} x{item.quantity} - ₹
                  {(item.price * item.quantity).toFixed(2)}
                  {item.notes && (
                    <span className="text-gray-500 ml-1">({item.notes})</span>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2">
          {normalizedStatus === "PLACED" && (
            <div className="flex gap-2">
              <Button
                onClick={() => onUpdateStatus(order.orderId, "ACCEPTED")}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>
            </div>
          )}

          {normalizedStatus === "ACCEPTED" && (
            <Button
              onClick={() => onUpdateStatus(order.orderId, "PREPARED")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Mark as Prepared
            </Button>
          )}

          {["PREPARED", "READY"].includes(normalizedStatus) && (
            <div className="text-center py-2">
              <span className="text-green-600 font-medium">
                ✓ Ready for pickup
              </span>
            </div>
          )}
          {normalizedStatus === "DELIVERED" && (
            <div className="text-center py-2">
              <span className="text-gray-600 font-medium">
                ✓ Order Delivered
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
