export type OrderStatus = "PLACED" | "DELIVERED" | "ACCEPTED" | "PREPARED";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  restaurantId: string;
  address: string;
  items: OrderItem[];
  status: OrderStatus;
  restaurantName: string;
  deliveryTime?: string;
}
