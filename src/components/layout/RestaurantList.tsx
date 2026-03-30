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
  favorites: string[];
  onToggleFavorite: (id: string) => void;
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
  onViewDetail,
  favorites,
  onToggleFavorite
}: RestaurantListProps) {
  return (
    <div className="restaurant-list px-8 py-6 bg-[#f0f7f4] min-h-full">
      {/* Section header */}
      <div className="mb-8">
        <h2 className="text-[28px] font-heading font-black text-[#113320]">
          Top Halal Restaurants
        </h2>
      </div>


      {/* Cuisine filters */}
      <div className="mb-8">
        <CuisineFilter
          cuisines={cuisines}
          selected={selectedCuisine}
          onSelect={onCuisineChange}
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-card h-96 rounded-4xl"></div>
          ))}
        </div>
      )}

      {/* Restaurant cards */}
      {!loading && restaurants.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[48px] border border-gray-100 shadow-xl shadow-green-900/5">
          <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-3xl mb-6">🔍</div>
          <h3 className="text-xl font-heading font-black text-[#113320] mb-2 uppercase">No Results</h3>
          <p className="text-[#94a3b8] font-bold text-sm tracking-wide">TRY ADJUSTING YOUR FILTERS</p>
        </div>
      )}

      <div className="restaurant-list__cards space-y-8">
        {restaurants.map((restaurant, index) => {
          const originalIndex = allRestaurants.indexOf(restaurant);
          return (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isSelected={selectedRestaurant?.id === restaurant.id}
              onClick={() => onSelect(restaurant)}
              index={originalIndex >= 0 ? originalIndex : index}
              isFavorite={favorites.includes(restaurant.id)}
              onToggleFavorite={() => onToggleFavorite(restaurant.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
