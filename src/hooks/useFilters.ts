import { useState, useMemo } from "react";
import { Restaurant } from "../types/restaurant";

interface UseFiltersReturn {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCuisine: string;
  setSelectedCuisine: (c: string) => void;
  filteredRestaurants: Restaurant[];
  cuisineTypes: string[];
}

export function useFilters(restaurants: Restaurant[]): UseFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisineTypes = useMemo(() => {
    const types = Array.from(
      new Set(restaurants.map((r) => r.cuisine).filter(Boolean))
    ).sort();
    return ["All", ...types];
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      );
    }

    if (selectedCuisine !== "All") {
      result = result.filter((r) => r.cuisine === selectedCuisine);
    }

    return result;
  }, [restaurants, searchQuery, selectedCuisine]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    filteredRestaurants,
    cuisineTypes,
  };
}
