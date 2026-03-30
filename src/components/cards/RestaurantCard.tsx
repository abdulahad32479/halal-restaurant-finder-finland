import { Restaurant } from "../../types/restaurant";
import { getCuisineColor } from "../../utils/cuisineColors";

import { LuStar } from "react-icons/lu";

interface HalalBadgeProps {
  status: string;
  small?: boolean;
}

export function HalalBadge({ status, small = false }: HalalBadgeProps) {
  const isVerified = status === "Fully Halal" || status === "Halal Certified";
  const label = isVerified ? "VERIFIED HALAL" : "HALAL OPTIONS";

  return (
    <span className={`halal-badge font-heading ${isVerified ? "halal-badge--verified" : "halal-badge--options"} ${small ? "halal-badge--small" : ""}`}>
      {isVerified && <span className="mr-1">●</span>} {label}
    </span>
  );
}

interface CuisinePillProps {
  cuisine: string;
}

export function CuisinePill({ cuisine }: CuisinePillProps) {
  const color = getCuisineColor(cuisine);
  return (
    <span
      className="cuisine-pill"
      style={{ borderColor: color, color: color, backgroundColor: `${color}15` }}
    >
      {cuisine}
    </span>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", // kebab/grilled meat
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", // mediterranean
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", // salad/veggie
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", // pizza/flatbread
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", // rice dish
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", // fish
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", // biryani
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80", // wraps
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80", // burger/sandwich
  "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80", // soup/stew
];

export function getRestaurantImage(restaurant: Restaurant, index: number): string {
  if (restaurant.image) return restaurant.image;
  return FOOD_IMAGES[index % FOOD_IMAGES.length];
}

export default function RestaurantCard({ restaurant, isSelected, onClick, index }: RestaurantCardProps) {
  const imageUrl = getRestaurantImage(restaurant, index);

  return (
    <div
      className={`restaurant-card group ${isSelected ? "restaurant-card--selected" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Food image */}
      <div className="restaurant-card__image-wrap">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="restaurant-card__image"
          loading="lazy"
        />
        <HalalBadge status={restaurant.halal_status} small />
      </div>

      {/* Info */}
      <div className="restaurant-card__body p-5">
        <div className="restaurant-card__header flex justify-between items-start mb-2">
          <h3 className="restaurant-card__name text-[18px] font-heading font-black text-[#113320] leading-tight flex-1 uppercase tracking-tight">
            {restaurant.name}
          </h3>
          {restaurant.rating && (
            <div className="restaurant-card__rating font-heading">
              <LuStar className="text-[#1b452d] text-xs fill-[#1b452d]" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-[13px] font-medium text-[#64748b] mb-4">
          Authentic {restaurant.cuisine} Cuisine • 1.2km away
        </p>

        <div className="flex gap-2">
          <span className="px-3 py-1.5 bg-[#f1f5f9] text-[#475569] text-[10px] font-black uppercase tracking-[0.15em] rounded-lg font-heading">
            {restaurant.cuisine}
          </span>
          <span className="px-3 py-1.5 bg-[#f1f5f9] text-[#475569] text-[10px] font-black uppercase tracking-[0.15em] rounded-lg font-heading">
            DINING
          </span>
        </div>
      </div>
    </div>
  );
}
