export interface Dish {
  id: string;
  name: string;
  price: number;
  image?: string; // Optional, in case some dishes don't have images
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  address: string;
  description: string;
  image: string;
  menu: Dish[];
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
}

export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Spice of India",
    cuisine: "North Indian",
    address: "MG Road, Bengaluru",
    description:
      "Tastes the different spices of India with our authentic dishes.",
    image: "/assets/Spice Of India.jpg",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.5,
    menu: [
      {
        id: "d1",
        name: "Butter Chicken",
        price: 240,
        image: "/assets/Butter Chicken.png",
        description: "Creamy tomato-based chicken curry",
      },
      {
        id: "d2",
        name: "Paneer Tikka",
        price: 180,
        image: "/assets/Paneer Tikka.png",
        description: "Grilled paneer with spices",
      },
      {
        id: "d3",
        name: "Naan",
        price: 40,
        image: "/assets/Naan.png",
        description: "Tandoor-baked soft bread",
      },
    ],
  },
  {
    id: "r2",
    name: "Dosa Delights",
    cuisine: "South Indian",
    address: "Indiranagar, Bengaluru",
    description: "string",
    image: "/assets/Dosa Delights.jpg",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: 1.5,
    menu: [
      {
        id: "d4",
        name: "Masala Dosa",
        price: 70,
        image: "/assets/Masala Dosa.png",
        description: "Crispy dosa filled with spiced potatoes",
      },
      {
        id: "d5",
        name: "Idli Vada Combo",
        price: 60,
        image: "/assets/Idli Vada Combo.png",
        description: "Steamed idli and crispy vada",
      },
      {
        id: "d6",
        name: "Filter Coffee",
        price: 30,
        image: "/assets/Filter Coffee.png",
        description: "Traditional South Indian coffee",
      },
    ],
  },
  {
    id: "r3",
    name: "Biryani Junction",
    cuisine: "Hyderabadi",
    address: "Koramangala, Bengaluru",
    description: "string",
    image: "/assets/Biryani Junction.jpg",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: 2.99,
    menu: [
      {
        id: "d7",
        name: "Chicken Biryani",
        price: 200,
        image: "/assets/Chicken Biryani.png",
        description: "Aromatic spiced rice with chicken",
      },
      {
        id: "d8",
        name: "Mutton Biryani",
        price: 260,
        image: "/assets/Mutton Biryani.png",
        description: "Slow-cooked mutton with basmati rice",
      },
      {
        id: "d9",
        name: "Raita",
        price: 30,
        image: "/assets/Raita.png",
        description: "Yogurt with onions and herbs",
      },
    ],
  },
  {
    id: "r4",
    name: "Chaat Express",
    cuisine: "Street Food",
    address: "Jayanagar, Bengaluru",
    description: "string",
    image: "/assets/Chat Express.jpg",
    rating: 4.0,
    deliveryTime: "15-25 min",
    deliveryFee: 1.2,
    menu: [
      {
        id: "d10",
        name: "Pani Puri",
        price: 40,
        image: "/assets/Pani Puri.png",
        description: "Spiced water filled crispy puris",
      },
      {
        id: "d11",
        name: "Pav Bhaji",
        price: 90,
        image: "/assets/Pav Bhaji.png",
        description: "Butter toasted bun with mixed veg curry",
      },
      {
        id: "d12",
        name: "Dahi Puri",
        price: 50,
        image: "/assets/Dahi Puri.png",
        description: "Crispy puris with yogurt and chutney",
      },
    ],
  },
  {
    id: "r5",
    name: "Maharaja Thali",
    cuisine: "Rajasthani",
    address: "Whitefield, Bengaluru",
    description: "string",
    image: "/assets/Maharaja Thali.jpg",
    rating: 4.4,
    deliveryTime: "35-45 min",
    deliveryFee: 3.2,
    menu: [
      {
        id: "d13",
        name: "Dal Baati Churma",
        price: 160,
        image: "/assets/Dal Baati Churma.png",
        description: "Lentils with baked wheat rolls",
      },
      {
        id: "d14",
        name: "Gatte Ki Sabzi",
        price: 120,
        image: "/assets/Gatte Ki Sabzi.png",
        description: "Gram flour dumplings in spicy gravy",
      },
      {
        id: "d15",
        name: "Rajasthani Thali",
        price: 250,
        image: "/assets/Rajasthani Thali.png",
        description: "Full meal with multiple curries",
      },
    ],
  },
  {
    id: "r6",
    name: "Tandoori Nights",
    cuisine: "Mughlai",
    address: "HSR Layout, Bengaluru",
    description: "string",
    image: "/assets/Tandoori Nights.jpg",
    rating: 4.7,
    deliveryTime: "40-50 min",
    deliveryFee: 3.5,
    menu: [
      {
        id: "d16",
        name: "Tandoori Chicken",
        price: 220,
        image: "/assets/Tandoori Chicken.png",
        description: "Char-grilled chicken with spices",
      },
      {
        id: "d17",
        name: "Chicken Korma",
        price: 230,
        image: "/assets/Chicken Korma.png",
        description: "Creamy cashew-based curry",
      },
      {
        id: "d18",
        name: "Roomali Roti",
        price: 30,
        image: "/assets/Roomali Roti.png",
        description: "Thin handkerchief-style bread",
      },
    ],
  },
];
