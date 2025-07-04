import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MenuItemCard from "@/components/MenuItemCard";
import { MenuItem } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { restaurants } from "@/lib/mockData";

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<(typeof restaurants)[0] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const selectedRestaurant = restaurants.find((r) => r.id === id);
      if (selectedRestaurant) {
        setRestaurant(selectedRestaurant);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Restaurant not found
          </h2>
          <Link to="/">
            <Button>Back to Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Group items by category (fallback to 'Main Course' if none exists)
  const itemsByCategory = restaurant.menu.reduce((acc, item) => {
    const category = (item as MenuItem).category || "Main Course";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item as MenuItem);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 mb-4 inline-block"
          >
            ← Back to Restaurants
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center overflow-hidden">
              {restaurant.image ? (
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-4xl">🍽️</div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {restaurant.name}
                </h1>
                {restaurant.rating && (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    ⭐ {restaurant.rating}
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{restaurant.cuisine}</p>
              {restaurant.description && (
                <p className="text-gray-700 mb-4">{restaurant.description}</p>
              )}
              <div className="flex gap-4 text-sm text-gray-600">
                {restaurant.deliveryTime && (
                  <span>🕒 {restaurant.deliveryTime}</span>
                )}
                {restaurant.deliveryFee !== undefined && (
                  <span>🚚 ₹{restaurant.deliveryFee.toFixed(2)} delivery</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {category}
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
