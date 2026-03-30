import { Restaurant } from "../../types/restaurant";
import RestaurantCard from "../cards/RestaurantCard";
import CuisineFilter from "../filters/CuisineFilter";

interface RestaurantListProps {
  restaurants: Restaurant[];
  allRestaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onSelect: (r: Restaurant) => void;
  cuisines: string[];
  selectedCuisine: string;
  onCuisineChange: (c: string) => void;
  loading: boolean;
  onViewDetail: (r: Restaurant) => void;
}

export default function RestaurantList({
  restaurants,
  allRestaurants,
  selectedRestaurant,
  onSelect,
  cuisines,
  selectedCuisine,
  onCuisineChange,
  loading,
  onViewDetail
}: RestaurantListProps) {
  return (
    <div className="restaurant-list p-6 bg-[#f7fbf9]">
      {/* Section header */}
      <div className="mb-6">
        <h2 className="text-4xl font-heading font-black text-[#113320] leading-[0.9] uppercase tracking-tighter items-center gap-4">
          <span className="block italic text-[0.45em] tracking-[0.3em] font-black text-[#2a6f44] mb-2">EXPLORE FINLAND</span>
          Top Halal<br/>Restaurants
        </h2>
      </div>


      {/* Cuisine filters */}
      <CuisineFilter
        cuisines={cuisines}
        selected={selectedCuisine}
        onSelect={onCuisineChange}
      />

      {/* Loading state */}
      {loading && (
        <div className="restaurant-list__loading">
          <div className="spinner" />
          <span>Loading restaurants...</span>
        </div>
      )}

      {/* Restaurant cards */}
      {!loading && restaurants.length === 0 && (
        <div className="restaurant-list__empty">
          <span>🔍</span>
          <p>No restaurants found. Try a different search.</p>
        </div>
      )}

      <div className="restaurant-list__cards">
        {restaurants.map((restaurant, index) => {
          const originalIndex = allRestaurants.indexOf(restaurant);
          return (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurant?.id === restaurant.id}
              onClick={() => onSelect(restaurant)}
              index={originalIndex >= 0 ? originalIndex : index}
            />
          );
        })}
      </div>
    </div>
  );
}
