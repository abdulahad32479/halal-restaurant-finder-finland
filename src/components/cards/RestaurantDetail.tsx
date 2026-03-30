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
    <div className="detail-split-content relative bg-[#f5f9f6] h-full overflow-y-auto custom-scrollbar">
      {/* Back button - Responsive Pill */}
      <button 
        className="detail-back-pill fixed lg:absolute top-4 lg:top-8 left-4 lg:left-8 z-50 bg-[#113320] text-white shadow-2xl h-10 w-10 lg:h-12 lg:w-12 rounded-full flex items-center justify-center transition-all active:scale-95"
        onClick={onClose}
        aria-label="Back to results"
      >
        <LuArrowLeft className="text-xl lg:text-2xl" />
      </button>

      {/* Hero Image Section */}
      <div className="relative h-64 lg:h-96 w-full">
        <img 
          src={imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f9f6] via-transparent to-transparent" />
      </div>

      {/* Content Section */}
      <div className="px-4 lg:px-12 -mt-8 lg:-mt-12 relative z-10 pb-24">
        <div className="flex flex-col">
          
          {/* Header Section */}
          <div className="py-6 lg:py-10 border-b border-[#113320]/10">
            <div className="flex flex-col gap-4 lg:gap-6">
              <div className="flex items-center gap-4 lg:gap-6">
                <HalalBadge status={restaurant.halal_status} />
                <div className="flex items-center gap-1.5 bg-[#113320]/5 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-[#113320] font-black text-[12px] lg:text-[13px] border border-[#113320]/10">
                  <LuStar className="fill-[#113320] text-sm" />
                  <span>{restaurant.rating?.toFixed(1) || "4.8"}</span>
                  <span className="hidden sm:inline text-[#113320]/40 font-bold ml-1 tracking-[0.2em] text-[10px]">REVIEWS</span>
                </div>
              </div>

              <div className="relative">
                <h1 className="text-[28px] lg:text-[38px] font-heading font-black text-[#113320] leading-tight tracking-tight uppercase italic break-words">
                  {restaurant.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 lg:gap-4 mt-4 lg:mt-6">
                  <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-[#113320]/10 text-[#113320] rounded-2xl font-bold text-[12px] lg:text-sm">
                    <LuUtensils className="text-lg opacity-60" />
                    <span>{restaurant.cuisine} Specialty</span>
                  </div>
                  <div className="flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 bg-[#113320]/5 text-[#113320]/70 rounded-xl font-bold text-[12px] lg:text-sm">
                    <LuDollarSign className="text-lg opacity-60" />
                    <span>$$ Moderate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div className="py-6 lg:py-10 border-b border-[#113320]/10">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] lg:text-[12px] font-black tracking-widest text-[#113320]/40 uppercase">COMMUNITY HUB</span>
              <div className="flex gap-3 lg:gap-4">
                <button 
                  onClick={onToggleFavorite}
                  className={`h-12 w-12 lg:h-16 lg:w-16 rounded-full flex items-center justify-center text-xl lg:text-2xl shadow-xl transition-all active:scale-90 ${
                    isFavorite 
                      ? "bg-[#ef4444] text-white shadow-red-500/20" 
                      : "bg-[#113320]/5 text-[#113320] border border-[#113320]/10"
                  }`}
                >
                  <LuHeart className={isFavorite ? "fill-current" : ""} />
                </button>
                <button className="h-12 w-12 lg:h-16 lg:w-16 rounded-full bg-[#113320]/5 text-[#113320] flex items-center justify-center text-xl lg:text-2xl active:scale-90 transition-all border border-[#113320]/10">
                  <LuShare2 />
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-6 lg:py-10 border-b border-[#113320]/10">
            <span className="text-[10px] lg:text-[12px] font-black tracking-widest text-[#113320]/40 uppercase flex items-center gap-3 mb-6 lg:mb-8">
              <div className="h-0.5 w-6 lg:w-8 bg-[#113320]/20"></div>
              FEATURES
            </span>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {FEATURES.map(feature => (
                <div key={feature} className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-4 bg-[#113320]/5 border border-[#113320]/5 rounded-2xl lg:rounded-3xl text-[#113320] font-bold text-[12px] lg:text-[13px] hover:bg-white transition-all">
                  <LuBadgeCheck className="text-[#113320]/40 text-lg lg:text-xl" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Location & Availability Section */}
          <div className="py-6 lg:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Location Card */}
              <div className="p-6 lg:p-10 bg-[#113320] rounded-3xl lg:rounded-4xl text-white flex flex-col justify-between min-h-[300px] shadow-2xl shadow-[#113320]/20 transition-all">
                <div className="space-y-6 lg:space-y-8">
                  <span className="text-[10px] lg:text-[12px] font-black tracking-widest text-[#4ade80] opacity-80 uppercase flex items-center gap-2 lg:gap-3">
                    <LuMapPin className="text-lg lg:text-xl" />
                    LOCATION
                  </span>
                  <p className="text-[22px] lg:text-[28px] font-black leading-tight">
                    {restaurant.address},<br />
                    {restaurant.city}, Finland
                  </p>
                </div>
                <button 
                  className="w-full bg-white text-[#113320] py-3 lg:py-4 px-6 lg:px-8 rounded-2xl lg:rounded-3xl flex items-center justify-center gap-3 lg:gap-4 text-[13px] lg:text-[15px] font-black tracking-widest uppercase shadow-xl active:scale-95 transition-all mt-6 lg:mt-0"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`, '_blank')}
                >
                  <LuNavigation className="text-xl lg:text-2xl" />
                  Get Routes
                </button>
              </div>

              {/* Status & Hours Card */}
              <div className="space-y-6 lg:space-y-8">
                 {/* Availability Card */}
                 <div className="p-6 lg:p-10 bg-[#113320]/5 border border-[#113320]/10 rounded-3xl lg:rounded-4xl flex flex-col justify-between min-h-[150px] lg:min-h-40 transition-all">
                    <span className="text-[10px] lg:text-[12px] font-black tracking-widest text-[#113320]/40 uppercase flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                      <LuClock className="text-lg" />
                      AVAILABILITY
                    </span>
                    <div className="space-y-3">
                      {Object.entries(DAYS_MAP).slice(0, 2).map(([days, time]) => (
                        <div key={days} className="flex justify-between items-center text-[12px] lg:text-sm font-bold">
                          <span className="text-[#113320]/40 uppercase tracking-widest text-[10px] lg:text-[11px]">{days}</span>
                          <span className="text-[#113320] text-sm lg:text-base">{time}</span>
                        </div>
                      ))}
                    </div>
                 </div>

                 {/* Quick Action Buttons */}
                 <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <button 
                      className="h-16 lg:h-20 bg-[#113320]/5 border border-[#113320]/10 rounded-2xl lg:rounded-3xl flex items-center justify-center gap-2 lg:gap-3 text-[#113320] font-black text-[12px] lg:text-sm uppercase tracking-widest active:scale-95 transition-all"
                      onClick={() => window.open(`tel:${restaurant.phone}`, '_self')}
                    >
                      <LuPhone className="text-xl lg:text-2xl opacity-60" />
                      Call
                    </button>
                    <button 
                      className="h-16 lg:h-20 bg-[#113320]/5 border border-[#113320]/10 rounded-2xl lg:rounded-3xl flex items-center justify-center gap-2 lg:gap-3 text-[#113320] font-black text-[12px] lg:text-sm uppercase tracking-widest active:scale-95 transition-all"
                      onClick={() => window.open(restaurant.website || "#", '_blank')}
                    >
                      <LuGlobe className="text-xl lg:text-2xl opacity-60" />
                      Web
                    </button>
                 </div>
              </div>
            </div>
          </div>

          {/* About Footer Section */}
          <div className="py-12 lg:py-20 text-center border-t border-[#113320]/10">
            <p className="text-[#113320]/30 font-black text-[10px] lg:text-[12px] uppercase tracking-[0.3rem] lg:tracking-[0.5rem] mb-6 lg:mb-8">Official Information</p>
            <p className="text-[#113320]/70 leading-relaxed max-w-xl mx-auto font-medium text-base lg:text-lg px-4">
              Authentic {restaurant.cuisine} delicacies prepared with certified Halal ingredients. Experience the heritage in every bite. Proudly serving the community with tradition and quality since inauguration.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
