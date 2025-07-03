import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Welcome to Foodie!
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Order delicious food from your favorite restaurants and track delivery
        in real-time.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/order"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Place an Order
        </Link>
        <Link
          to="/status"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Check Order Status
        </Link>
      </div>
    </div>
  );
}
