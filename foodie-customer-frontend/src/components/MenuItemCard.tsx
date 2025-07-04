import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart, MenuItem } from "@/contexts/CartContext";

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName: string;
}

const MenuItemCard = ({
  item,
  restaurantId,
  restaurantName,
}: MenuItemCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item, restaurantId, restaurantName);
  };

  return (
    <Card className="flex overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex-1">
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-2xl font-bold text-green-600">
            ${item.price.toFixed(2)}
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
          <Button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Add to Cart
          </Button>
        </CardContent>
      </div>
      <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-3xl">🍽️</div>
        )}
      </div>
    </Card>
  );
};

export default MenuItemCard;
