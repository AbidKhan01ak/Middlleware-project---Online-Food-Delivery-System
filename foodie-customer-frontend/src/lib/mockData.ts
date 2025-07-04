export interface Dish {
  id: string;
  name: string;
  price: number;
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
    description: "string",
    image: "/images/spice-of-india.jpg",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.5,
    menu: [
      {
        id: "d1",
        name: "Butter Chicken",
        price: 240,
        description: "Creamy tomato-based chicken curry",
      },
      {
        id: "d2",
        name: "Paneer Tikka",
        price: 180,
        description: "Grilled paneer with spices",
      },
      {
        id: "d3",
        name: "Naan",
        price: 40,
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
    image: "/images/dosa-delights.jpg",
    rating: 4.3,
    deliveryTime: "20-30 min",
    deliveryFee: 1.5,
    menu: [
      {
        id: "d4",
        name: "Masala Dosa",
        price: 70,
        description: "Crispy dosa filled with spiced potatoes",
      },
      {
        id: "d5",
        name: "Idli Vada Combo",
        price: 60,
        description: "Steamed idli and crispy vada",
      },
      {
        id: "d6",
        name: "Filter Coffee",
        price: 30,
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
    image: "/images/biryani-junction.jpg",
    rating: 4.5,
    deliveryTime: "30-40 min",
    deliveryFee: 2.99,
    menu: [
      {
        id: "d7",
        name: "Chicken Biryani",
        price: 200,
        description: "Aromatic spiced rice with chicken",
      },
      {
        id: "d8",
        name: "Mutton Biryani",
        price: 260,
        description: "Slow-cooked mutton with basmati rice",
      },
      {
        id: "d9",
        name: "Raita",
        price: 30,
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
    image: "/images/chaat-express.jpg",
    rating: 4.0,
    deliveryTime: "15-25 min",
    deliveryFee: 1.2,
    menu: [
      {
        id: "d10",
        name: "Pani Puri",
        price: 40,
        description: "Spiced water filled crispy puris",
      },
      {
        id: "d11",
        name: "Pav Bhaji",
        price: 90,
        description: "Butter toasted bun with mixed veg curry",
      },
      {
        id: "d12",
        name: "Dahi Puri",
        price: 50,
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
    image: "/images/maharaja-thali.jpg",
    rating: 4.4,
    deliveryTime: "35-45 min",
    deliveryFee: 3.2,
    menu: [
      {
        id: "d13",
        name: "Dal Baati Churma",
        price: 160,
        description: "Lentils with baked wheat rolls",
      },
      {
        id: "d14",
        name: "Gatte Ki Sabzi",
        price: 120,
        description: "Gram flour dumplings in spicy gravy",
      },
      {
        id: "d15",
        name: "Rajasthani Thali",
        price: 250,
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
    image: "/images/tandoori-nights.jpg",
    rating: 4.7,
    deliveryTime: "40-50 min",
    deliveryFee: 3.5,
    menu: [
      {
        id: "d16",
        name: "Tandoori Chicken",
        price: 220,
        description: "Char-grilled chicken with spices",
      },
      {
        id: "d17",
        name: "Chicken Korma",
        price: 230,
        description: "Creamy cashew-based curry",
      },
      {
        id: "d18",
        name: "Roomali Roti",
        price: 30,
        description: "Thin handkerchief-style bread",
      },
    ],
  },
];
