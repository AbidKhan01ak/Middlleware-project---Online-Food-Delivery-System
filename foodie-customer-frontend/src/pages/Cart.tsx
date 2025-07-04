import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { placeOrder } from "../api";

const DELIVERY_FEE = 30;
const TAX_RATE = 0.08;

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
    useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    try {
      setLoading(true);

      const orderData = {
        customerId: "cust001", // TODO: Replace with dynamic customer ID
        restaurantId: items[0].restaurantId || "rest001", // Assuming all items are from the same restaurant
        items: items.map((item) => item.name), // only names expected by backend
      };

      const response = await placeOrder(orderData);
      const orderId = response.id || "unknown";

      clearCart();
      navigate(`/track-order/${orderId}`);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some delicious items from our restaurants
            </p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + DELIVERY_FEE + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.restaurantId}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        from {item.restaurantName}
                      </p>
                      <p className="text-green-600 font-semibold">
                        ${item.price.toFixed(0)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-right font-semibold">
                      Subtotal: ${(item.price * item.quantity).toFixed(0)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(0)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹{DELIVERY_FEE}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(0)}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-6"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>

                <Link to="/" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
