import { Restaurant } from "../../types/restaurant";
import { getCuisineColor } from "../../utils/cuisineColors";

import { LuStar, LuHeart } from "react-icons/lu";

interface HalalBadgeProps {
  status: string;
  small?: boolean;
}

export function HalalBadge({ status }: HalalBadgeProps) {
  const isVerified = status === "Fully Halal" || status === "Halal Certified";
  if (!isVerified) return null;

  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#113320] text-white rounded-full text-[9px] font-black tracking-widest shadow-lg">
      <div className="flex items-center justify-center h-3.5 w-3.5 bg-[#4ade80] rounded-full text-[#113320]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2 h-2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      VERIFIED HALAL
    </span>
  );
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: () => void;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", 
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80", 
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80", 
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80", 
  "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", 
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80", 
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80", 
  "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&q=80", 
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80", 
  "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=400&q=80", 
];

export function getRestaurantImage(restaurant: Restaurant, index: number): string {
  if (restaurant.image) return restaurant.image;
  return FOOD_IMAGES[index % FOOD_IMAGES.length];
}

export default function RestaurantCard({ 
  restaurant, 
  isSelected, 
  onClick, 
  index, 
  isFavorite, 
  onToggleFavorite 
}: RestaurantCardProps) {
  const imageUrl = getRestaurantImage(restaurant, index);

  return (
    <div
      className={`group relative transition-all duration-300 bg-white rounded-[20px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl ${
        isSelected ? "ring-2 ring-[#113320]" : "border border-gray-100"
      }`}
      onClick={onClick}
    >
      {/* Image Wrap */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-5 right-5">
          <HalalBadge status={restaurant.halal_status} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute bottom-4 right-4 h-11 w-11 rounded-full flex items-center justify-center text-xl shadow-lg transition-all active:scale-90 z-20 ${
            isFavorite 
              ? "bg-[#4ade80] text-[#113320] shadow-green-500/20" 
              : "bg-white/80 backdrop-blur-sm text-[#475569] hover:bg-white border border-white/50"
          }`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <LuHeart className={isFavorite ? "fill-current" : ""} />
        </button>
      </div>

      {/* Body */}
      <div className="px-5 lg:px-8 py-5 lg:py-8">
        <div className="flex justify-between items-start lg:items-center mb-2 gap-2">
          <h3 className="text-[17px] lg:text-[19px] font-heading font-black text-[#113320] tracking-tight line-clamp-1">
            {restaurant.name}
          </h3>
          {restaurant.rating && (
            <div className="flex items-center gap-1.5 bg-[#e2f3e9] px-2.5 py-1 rounded-lg text-[#113320] font-black text-[11px] lg:text-[12px] flex-shrink-0">
              <LuStar className="text-[10px] fill-[#113320]" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <p className="text-[13px] lg:text-[14px] font-bold text-[#94a3b8] mb-4 lg:mb-6 leading-tight">
          {restaurant.cuisine} Specialty • 1.2km away
        </p>

        <div className="flex flex-wrap gap-2 lg:gap-2.5">
          {[restaurant.cuisine.toUpperCase(), "DINING"].map(tag => (
            <span key={tag} className="px-3 lg:px-4 py-1.5 lg:py-2 bg-[#113320]/10 text-[#113320] text-[9px] lg:text-[9.5px] font-black tracking-widest rounded-xl transition-colors hover:bg-[#113320] hover:text-white inline-block">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
