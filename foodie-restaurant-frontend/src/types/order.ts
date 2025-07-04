export type OrderStatus = "pending" | "accepted" | "rejected" | "prepared";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  orderTime: string;
  estimatedTime?: number; // in minutes
}
