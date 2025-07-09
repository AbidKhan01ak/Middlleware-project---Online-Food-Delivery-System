// import React, { useEffect, useState } from "react";
// import { fetchAssignedOrders } from "@/api";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, MapPin, Clock, Package } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface OrderItem {
//   orderId: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface Order {
//   id: string;
//   customerName: string;
//   customerAddress: string;
//   restaurantName: string;
//   items: OrderItem[];
//   totalAmount: number;
//   status: "ready" | "picked_up" | "en_route" | "delivered";
//   orderTime: string;
//   estimatedDeliveryTime: string;
// }

// const DeliveredOrders = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await fetchAssignedOrders();
//       const filtered = response.data.filter(
//         (order: any) => order.status.toLowerCase() === "delivered"
//       );
//       setOrders(filtered);
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: "Failed to fetch delivered orders.",
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-6 space-y-4">
//         <h1 className="text-2xl font-bold mb-4">✅ Delivered Orders</h1>

//         {orders.length === 0 ? (
//           <Card className="text-center py-12">
//             <CardContent>
//               <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 No Delivered Orders
//               </h3>
//               <p className="text-gray-600">
//                 You haven’t completed any deliveries yet.
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           orders.map((order) => (
//             <Card key={order.id}>
//               <CardHeader>
//                 <CardTitle className="flex justify-between items-center">
//                   Order #{order.id}
//                   <Badge className="bg-green-500 text-white">Delivered</Badge>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-2 text-sm text-gray-700">
//                 <div className="flex items-center space-x-2">
//                   <MapPin className="w-4 h-4" />
//                   <div>
//                     {order.customerName} – {order.customerAddress}
//                   </div>
//                 </div>
//                 <div>
//                   <strong>Items:</strong>
//                   <ul className="list-disc pl-5">
//                     {order.items.map((item, i) => (
//                       <li key={i}>
//                         {item.name} × {item.quantity}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-500 pt-2">
//                   <div className="flex items-center space-x-1">
//                     <Clock className="w-3 h-3" />
//                     <span>Ordered: {order.orderTime}</span>
//                   </div>
//                   <div className="flex items-center space-x-1">
//                     <Clock className="w-3 h-3" />
//                     <span>ETA: {order.estimatedDeliveryTime}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeliveredOrders;
