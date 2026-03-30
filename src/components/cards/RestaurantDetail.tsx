import { Restaurant } from "../../types/restaurant";
import { getRestaurantImage } from "./RestaurantCard";
import { 
  LuArrowLeft, 
  LuStar, 
  LuUtensils, 
  LuDollarSign, 
  LuHeart, 
  LuShare2, 
  LuNavigation,
  LuPhone,
  LuGlobe,
  LuBadgeCheck,
  LuClock,
  LuMapPin
} from "react-icons/lu";

import { HalalBadge } from "./RestaurantCard";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const DAYS_MAP: Record<string, string> = {
  "Mon - Thu": "11:00 - 21:00",
  "Friday": "11:00 - 23:00",
  "Sat - Sun": "12:00 - 22:00"
};

const FEATURES = [
  "Takeaway", "Delivery", "Indoor Seating", "Halal Certified", "Prayer Room Near"
];

export default function RestaurantDetail({ 
  restaurant, 
  onClose, 
  index,
  isFavorite,
  onToggleFavorite
}: RestaurantDetailProps) {
  const imageUrl = getRestaurantImage(restaurant, index);

  return (
    <div className="detail-split-content relative bg-white h-full overflow-y-auto custom-scrollbar">
      {/* Back button - Floating Pill */}
      <button 
        className="detail-back-pill absolute top-8 left-8 z-50 bg-white shadow-2xl"
        onClick={onClose}
        aria-label="Back to results"
      >
        <LuArrowLeft />
      </button>

      {/* Hero Image Section */}
      <div className="relative h-96 w-full">
        <img 
          src={imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="hero-image-fade" />
      </div>

      {/* Content Section */}
      <div className="px-12 -mt-12 relative z-10 pb-24">
        <div className="flex flex-col">
          
          {/* Header Section */}
          <div className="py-10 border-b border-gray-50/50">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <HalalBadge status={restaurant.halal_status} />
                <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg shadow-black/5 text-[#113320] font-black text-[13px] border border-white">
                  <LuStar className="fill-[#113320] text-sm" />
                  <span>{restaurant.rating?.toFixed(1) || "4.8"}</span>
                  <span className="text-[#94a3b8] font-bold ml-1 tracking-[0.2em] text-[11px]">REVIEWS</span>
                </div>
              </div>

              <div className="relative">
                <h1 className="text-[38px] font-heading font-black text-[#113320] leading-tight tracking-tight uppercase italic select-none">
                  {restaurant.name}
                </h1>
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-3 px-4 py-2 bg-[#f0f8f3] text-[#113320] rounded-2xl font-bold text-sm">
                    <LuUtensils className="text-lg opacity-60" />
                    <span>{restaurant.cuisine} Specialty</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-[#f8fafc] text-[#64748b] rounded-xl font-bold text-sm">
                    <LuDollarSign className="text-lg opacity-60" />
                    <span>$$ Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Community Section */}
          <div className="py-10 border-b border-gray-50/50">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-black tracking-widest text-[#94a3b8] uppercase">COMMUNITY HUB</span>
              <div className="flex gap-4">
                <button 
                  onClick={onToggleFavorite}
                  className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl shadow-xl transition-all active:scale-90 ${
                    isFavorite 
                      ? "bg-[#4ade80] text-[#113320] shadow-green-500/20" 
                      : "bg-[#f8fafc] text-[#475569] hover:bg-white border border-gray-100"
                  }`}
                >
                  <LuHeart className={isFavorite ? "fill-current" : ""} />
                </button>
                <button className="h-16 w-16 rounded-full bg-[#f8fafc] text-[#475569] flex items-center justify-center text-2xl hover:bg-white active:scale-90 transition-all border border-gray-100">
                  <LuShare2 />
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-10 border-b border-gray-50/50">
            <span className="text-[12px] font-black tracking-widest text-[#94a3b8] uppercase flex items-center gap-3 mb-8">
              <div className="h-0.5 w-8 bg-[#2a6f44]"></div>
              ESTABLISHMENT FEATURES
            </span>
            <div className="flex flex-wrap gap-3">
              {FEATURES.map(feature => (
                <div key={feature} className="flex items-center gap-3 px-6 py-4 bg-[#f7fbf9] border border-gray-100 rounded-3xl text-[#113320] font-bold text-[13px] hover:bg-white hover:shadow-2xl hover:shadow-green-900/5 transition-all cursor-default">
                  <LuBadgeCheck className="text-[#2a6f44] text-xl" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Availability Section */}
          <div className="py-10">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Location Card */}
              <div className="px-10 py-10 bg-[#113320] rounded-4xl text-white flex flex-col justify-between aspect-square shadow-2xl shadow-green-950/20 group hover:-translate-y-1 transition-all duration-500">
                <div className="space-y-8">
                  <span className="text-[12px] font-black tracking-widest text-[#4ade80] opacity-80 uppercase flex items-center gap-3">
                    <LuMapPin className="text-xl" />
                    LOCATION
                  </span>
                  <p className="text-[28px] font-black leading-tight">
                    {restaurant.address},<br />
                    {restaurant.city}, Finland
                  </p>
                </div>
                <button 
                  className="w-full bg-white text-[#113320] py-4 px-8 rounded-3xl flex items-center justify-center gap-4 text-[15px] font-black tracking-widest uppercase shadow-xl hover:bg-[#f8fafc] transition-all"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`, '_blank')}
                >
                  <LuNavigation className="text-2xl" />
                  Routes
                </button>
              </div>

              {/* Status & Hours Card */}
              <div className="space-y-8">
                 {/* Availability Card */}
                 <div className="px-10 py-10 bg-[#f8fafc] border border-gray-100 rounded-4xl flex flex-col justify-between min-h-40 group hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500">
                    <span className="text-[12px] font-black tracking-widest text-[#94a3b8] uppercase flex items-center gap-3 mb-6">
                      <LuClock className="text-lg" />
                      AVAILABILITY
                    </span>
                    <div className="space-y-3">
                      {Object.entries(DAYS_MAP).slice(0, 2).map(([days, time]) => (
                        <div key={days} className="flex justify-between items-center text-sm font-bold">
                          <span className="text-[#94a3b8] uppercase tracking-widest text-[11px]">{days}</span>
                          <span className="text-[#113320] text-base">{time}</span>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Quick Action Buttons */}
                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      className="h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-[#113320] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-black/5 transition-all"
                      onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                    >
                      <LuPhone className="text-2xl opacity-60" />
                      Call
                    </button>
                    <button 
                      className="h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center gap-3 text-[#113320] font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-black/5 transition-all"
                      onClick={() => window.open(restaurant.website || "#", '_blank')}
                    >
                      <LuGlobe className="text-2xl opacity-60" />
                      Web
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* About Footer Section */}
          <div className="py-20 text-center border-t border-gray-50/50">
            <p className="text-[#94a3b8] font-black text-[12px] uppercase tracking-[0.5rem] mb-8">Official Information</p>
            <p className="text-[#64748b] leading-relaxed max-w-xl mx-auto font-medium text-lg">
              Authentic {restaurant.cuisine} delicacies prepared with certified Halal ingredients. Experience the heritage in every bite. Proudly serving the community with tradition and quality since inauguration.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
