import React, { useState, useEffect } from "react";
import { restaurants as mockRestaurants, Restaurant } from "@/lib/mockData";
import RestaurantCard from "@/components/RestaurantCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Home = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all");

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setRestaurants(mockRestaurants);
      setLoading(false);
    }, 1000);
    // fetchRestaurants();
  }, []);

  const cuisines = [
    "all",
    ...Array.from(new Set(mockRestaurants.map((r) => r.cuisine))),
  ];

  // const fetchRestaurants = async () => {
  //   try {
  //     setLoading(true);
  //     // Replace with actual API call
  //     // const response = await axios.get('/api/restaurants');
  //     // setRestaurants(response.data);

  //     // Using mock data for now
  //     setTimeout(() => {
  //       setRestaurants(mockRestaurants);
  //       setLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error fetching restaurants:", error);
  //     setRestaurants(mockRestaurants);
  //     setLoading(false);
  //   }
  // };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      selectedCuisine === "all" || restaurant.cuisine === selectedCuisine;
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCuisine && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading restaurants...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delicious food, delivered fast
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Order from your favorite restaurants and get it delivered to your
            door
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            placeholder="Search restaurants or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
            <SelectTrigger className="md:w-48">
              <SelectValue placeholder="Filter by cuisine" />
            </SelectTrigger>
            <SelectContent>
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine === "all" ? "All Cuisines" : cuisine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {filteredRestaurants.length} restaurants available
          </h2>
          <p className="text-gray-600">Choose from a variety of cuisines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
