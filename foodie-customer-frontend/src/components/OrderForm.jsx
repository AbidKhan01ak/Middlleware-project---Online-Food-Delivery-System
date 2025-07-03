import { useState } from "react";
import { placeOrder } from "../api/api";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    customerId: "",
    restaurantId: "",
    items: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const orderRequest = {
        customerId: formData.customerId,
        restaurantId: formData.restaurantId,
        items: formData.items.split(",").map((item) => item.trim()), // comma-separated items
      };

      const result = await placeOrder(orderRequest);
      setResponseMessage(`✅ ${result.message} (Order ID: ${result.orderId})`);
    } catch (error) {
      setResponseMessage("❌ Failed to place order. Check backend.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">Place Order</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={formData.customerId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="text"
          name="restaurantId"
          placeholder="Restaurant ID"
          value={formData.restaurantId}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          name="items"
          placeholder="Items (comma-separated)"
          value={formData.items}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4 text-center font-medium">{responseMessage}</div>
      )}
    </div>
  );
}
