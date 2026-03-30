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
  LuPhone
} from "react-icons/lu";

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  index: number;
}

const DAYS_MAP: Record<string, string> = {
  "Mon - Thu": "11:00 - 21:00",
  "Friday": "11:00 - 23:00",
  "Sat - Sun": "12:00 - 22:00"
};

export default function RestaurantDetail({ restaurant, onClose, index }: RestaurantDetailProps) {
  const imageUrl = getRestaurantImage(restaurant, index);
  const currentDay = "Friday"; // Hardcoded for mockup fidelity/demonstration

  return (
    <div className="detail-split-content relative">
      {/* Back button - Floating Pill */}
      <button 
        className="detail-back-pill absolute top-8 left-8"
        onClick={onClose}
        aria-label="Back to results"
      >
        <LuArrowLeft />
      </button>

      {/* Hero Image Section */}
      <div className="relative h-[480px] w-full">
        <img 
          src={imageUrl} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="hero-image-fade" />
      </div>

      {/* Content Section */}
      <div className="px-12 -mt-16 relative z-10 pb-20">
        <div className="flex flex-col gap-6">
          {/* Top Metadata */}
          <div className="flex items-center gap-4">
            <span className="badge-verified-maroon">
              VERIFIED HALAL
            </span>
            <div className="badge-rating-green">
              <LuStar className="fill-[#2a6f44]" />
              <span>4.8</span>
              <span className="text-gray-400 font-medium ml-1">(124 reviews)</span>
            </div>
          </div>

          {/* Massive Name */}
          <h1 className="detail-name--massive leading-[0.85] font-heading uppercase">
            {restaurant.name.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          {/* Social / Categories Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[#475569] font-bold text-sm">
                <LuUtensils className="text-xl text-[#113320]" />
                <span>Levantine & Middle Eastern</span>
              </div>
              <div className="flex items-center gap-2 text-[#2a6f44] font-bold text-sm">
                <LuDollarSign className="text-xl" />
                <span>$$</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="h-14 w-14 rounded-full bg-[#1b452d] text-white flex items-center justify-center text-2xl shadow-xl shadow-[#1b452d]/20 active:scale-90 transition-all">
                <LuHeart className="fill-white" />
              </button>
              <button className="h-14 w-14 rounded-full bg-[#f1f5f9] text-[#475569] flex items-center justify-center text-2xl active:scale-90 transition-all">
                <LuShare2 />
              </button>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Location Card */}
            <div className="detail-card-premium flex flex-col justify-between aspect-square">
              <div className="space-y-6">
                <span className="text-[11px] font-black tracking-[0.2em] text-[#94a3b8] uppercase">LOCATION</span>
                <p className="text-xl font-bold text-[#113320] leading-tight pr-4">
                  {restaurant.address},<br />
                  {restaurant.city}, Finland
                </p>
              </div>
              <div className="flex gap-3 pt-6 scale-90 -origin-left">
                <button 
                  className="flex-1 bg-[#1b452d] text-white py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-sm font-black shadow-lg shadow-[#1b452d]/30 active:scale-95 transition-all"
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.latitude},${restaurant.longitude}`, '_blank')}
                >
                  <LuNavigation />
                  Open in Maps
                </button>
                <div className="icon-squircle">
                  <LuPhone className="text-xl text-[#1b452d]" />
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="detail-card-premium aspect-square">
              <span className="text-[11px] font-black tracking-[0.2em] text-[#94a3b8] uppercase block mb-8">OPENING HOURS</span>
              <div className="space-y-4">
                {Object.entries(DAYS_MAP).map(([days, time]) => (
                  <div 
                    key={days} 
                    className={`flex justify-between items-center text-sm font-bold p-3.5 rounded-2xl ${
                      days === "Friday" ? "bg-[#d0ebd8]/50 text-[#1b452d]" : "text-[#113320]"
                    }`}
                  >
                    <span>{days}</span>
                    <span>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
