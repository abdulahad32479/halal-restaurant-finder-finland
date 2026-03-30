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
    const unwanted = ["Turkish", "Arab", "Pakistani", "Bangladeshi", "International", "Syrian", "All", "Open Now"];
    const types = Array.from(
      new Set(restaurants.map((r) => r.cuisine).filter(Boolean))
    ).filter(c => !unwanted.includes(c)).sort();
    return types;
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

    if (selectedCuisine && selectedCuisine !== "All" && cuisineTypes.includes(selectedCuisine)) {
      result = result.filter((r) => r.cuisine === selectedCuisine);
    }

    return result;
  }, [restaurants, searchQuery, selectedCuisine, cuisineTypes]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    filteredRestaurants,
    cuisineTypes,
  };
}
