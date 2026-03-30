import { Restaurant } from "../types/restaurant";

// Fallback restaurant data for Finnish halal restaurants
// Used when the Google Sheet is not available
export const FALLBACK_RESTAURANTS: Restaurant[] = [
  {
    id: "qazan-restaurant",
    name: "Qazan Restaurant",
    address: "Itäkatu 1-7, 00930 Helsinki",
    city: "Helsinki",
    latitude: 60.2119872,
    longitude: 25.0802481,
    cuisine: "Syrian",
    halal_status: "Halal Certified",
    phone: "468897305",
    website: "https://social.quandoo.com/en/groups/qazan-restaurant-109643",
    hours: "Mon-Sun 11:00-22:00",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "big-bite-konala",
    name: "Big Bite Konala",
    address: "Vanha Hämeenkyläntie 9, 00390 Helsinki",
    city: "Espoo",
    latitude: 60.2052812,
    longitude: 24.7929246,
    cuisine: "Bangladeshi",
    halal_status: "Halal Friendly",
    phone: "505578291",
    website: "http://bigbite.fi/",
    hours: "Mon-Sun 10:00-21:00",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1555396273-367ea469f59f?auto=format&fit=crop&q=80&w=800",
  }
];
