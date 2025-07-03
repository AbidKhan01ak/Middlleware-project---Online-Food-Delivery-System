import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveryStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const customerId = "123"; // Replace with dynamic ID in real implementation

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/orders/status/${customerId}`
        );
        setStatus(response.data);
      } catch (error) {
        console.error("Failed to fetch status", error);
        setStatus({ status: "No updates yet." });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Poll every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-6 bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">Delivery Status</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p className="text-gray-700">{status.status || "No updates yet."}</p>
      )}
    </div>
  );
}
