import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Restaurant } from "@/lib/mockData";

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to the restaurant menu page with restaurant ID
    navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } });
  };

  return (
    <Link to={`/restaurant/${restaurant.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
          {restaurant.image ? (
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="text-4xl">🍽️</div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-900">
              {restaurant.name}
            </h3>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ⭐ {restaurant.rating}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>🕒 {restaurant.deliveryTime}</span>
            <span>🚚 ${restaurant.deliveryFee.toFixed(2)} delivery</span>
          </div>
          {restaurant.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {restaurant.description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
