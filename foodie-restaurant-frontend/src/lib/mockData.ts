import { Order } from "@/types/order";

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Smith",
    customerPhone: "+1 (555) 123-4567",
    items: [
      {
        id: "1",
        name: "Margherita Pizza",
        quantity: 1,
        price: 16.99,
        notes: "Extra cheese",
      },
      {
        id: "2",
        name: "Caesar Salad",
        quantity: 1,
        price: 12.5,
      },
      {
        id: "3",
        name: "Coca Cola",
        quantity: 2,
        price: 3.0,
      },
    ],
    total: 35.49,
    status: "pending",
    orderTime: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
    estimatedTime: 25,
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 987-6543",
    items: [
      {
        id: "4",
        name: "Chicken Alfredo",
        quantity: 1,
        price: 18.99,
      },
      {
        id: "5",
        name: "Garlic Bread",
        quantity: 1,
        price: 6.5,
      },
    ],
    total: 25.49,
    status: "accepted",
    orderTime: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
    estimatedTime: 30,
  },
  {
    id: "ORD-003",
    customerName: "Mike Wilson",
    items: [
      {
        id: "6",
        name: "BBQ Burger",
        quantity: 2,
        price: 14.99,
        notes: "No onions",
      },
      {
        id: "7",
        name: "French Fries",
        quantity: 2,
        price: 5.99,
      },
      {
        id: "8",
        name: "Milkshake",
        quantity: 1,
        price: 7.5,
        notes: "Vanilla",
      },
    ],
    total: 48.46,
    status: "prepared",
    orderTime: new Date(Date.now() - 35 * 60000).toISOString(), // 35 minutes ago
    estimatedTime: 20,
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    customerPhone: "+1 (555) 456-7890",
    items: [
      {
        id: "9",
        name: "Vegetarian Wrap",
        quantity: 1,
        price: 11.99,
      },
      {
        id: "10",
        name: "Sweet Potato Fries",
        quantity: 1,
        price: 7.99,
      },
    ],
    total: 19.98,
    status: "pending",
    orderTime: new Date(Date.now() - 5 * 60000).toISOString(), // 5 minutes ago
    estimatedTime: 15,
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    items: [
      {
        id: "11",
        name: "Fish and Chips",
        quantity: 1,
        price: 16.5,
      },
    ],
    total: 16.5,
    status: "rejected",
    orderTime: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
  },
];
