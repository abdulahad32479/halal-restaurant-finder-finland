import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { 
  LuUtensils, 
  LuNavigation, 
  LuClock, 
  LuPhone,
  LuChevronRight,
  LuPlus,
  LuMinus,
  LuLocateFixed
} from "react-icons/lu";
import { Restaurant } from "../../types/restaurant";
import { createCustomIcon, FlyToLocation, FlyToUser, fixLeafletIcons } from "../../utils/mapHelpers";

// Finland center coordinates
const FINLAND_CENTER: [number, number] = [64.9, 26.0];
const FINLAND_ZOOM = 6;

interface MapViewProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
  userLocation: { lat: number; lng: number } | null;
  onViewDetail?: (restaurant: Restaurant) => void;
}

fixLeafletIcons();

function MapActions() {
  const map = useMap();
  return (
    <div className="absolute bottom-10 right-10 z-[1000] flex flex-col gap-4 items-center">
      {/* Zoom Pill */}
      <div className="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden">
        <button 
          className="h-14 w-14 flex items-center justify-center text-[#1b452d] text-2xl active:bg-gray-100 transition-all border-b border-gray-100"
          onClick={() => map.zoomIn()}
          aria-label="Zoom in"
        >
          <LuPlus />
        </button>
        <button 
          className="h-14 w-14 flex items-center justify-center text-[#1b452d] text-2xl active:bg-gray-100 transition-all"
          onClick={() => map.zoomOut()}
          aria-label="Zoom out"
        >
          <LuMinus />
        </button>
      </div>

      {/* Locate Button */}
      <button 
        className="h-14 w-14 bg-[#1b452d] rounded-2xl shadow-2xl flex items-center justify-center text-white text-2xl active:scale-95 transition-all shadow-[#1b452d]/30"
        onClick={() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
              map.flyTo([pos.coords.latitude, pos.coords.longitude], 14);
            });
          }
        }}
        aria-label="Locate me"
      >
        <LuLocateFixed />
      </button>
    </div>
  );
}

export default function MapView({
  restaurants,
  selectedRestaurant,
  onRestaurantSelect,
  userLocation,
  onViewDetail,
}: MapViewProps) {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={FINLAND_CENTER}
        zoom={FINLAND_ZOOM}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Fly to selected restaurant */}
      {selectedRestaurant && (
        <FlyToLocation
          lat={selectedRestaurant.latitude}
          lng={selectedRestaurant.longitude}
          zoom={15}
        />
      )}

      {/* Fly to user location */}
      {userLocation && (
        <FlyToUser lat={userLocation.lat} lng={userLocation.lng} />
      )}

      {/* User location marker */}
      {userLocation && (
        <>
          <Circle
            center={[userLocation.lat, userLocation.lng]}
            radius={500}
            pathOptions={{ color: "#16a34a", fillColor: "#16a34a", fillOpacity: 0.15 }}
          />
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={L.divIcon({
              html: `<div style="width:16px;height:16px;background:#16a34a;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8],
              className: "",
            })}
          >
            <Popup>You are here</Popup>
          </Marker>
        </>
      )}

      {/* Restaurant markers */}
      {restaurants.map((restaurant) => {
        const isSelected = selectedRestaurant?.id === restaurant.id;
        return (
          <Marker
            key={restaurant.id}
            position={[restaurant.latitude, restaurant.longitude]}
            icon={createCustomIcon(restaurant.cuisine, isSelected)}
            zIndexOffset={isSelected ? 1000 : 0}
            eventHandlers={{
              click: () => onRestaurantSelect(restaurant),
            }}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <strong>{restaurant.name}</strong>
                <span>{restaurant.city}</span>
                <span className="popup-cuisine">{restaurant.cuisine}</span>
              </div>
            </Popup>
          </Marker>
        );
      })}
      
      <MapActions />
      </MapContainer>

      {/* Floating Selection Card (Matched 1:1 to Image 1139) */}
      {selectedRestaurant && (
        <div className="absolute top-8 right-8 z-[1000] w-[380px] bg-white rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] border border-white overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-10 pb-8">
            <div className="flex items-start gap-6 mb-8">
              <div className="h-20 w-20 bg-[#1b452d] rounded-[32px] flex items-center justify-center text-white text-4xl shadow-2xl shadow-[#1b452d]/20 flex-shrink-0">
                <LuUtensils />
              </div>
              <div className="flex flex-col pt-2">
                <span className="text-[12px] font-black tracking-[0.25em] text-[#94a3b8] uppercase mb-1">SELECTED RESULT</span>
                <h3 className="text-[28px] font-black text-[#113320] leading-none tracking-tight">{selectedRestaurant.name}</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 text-[17px] font-extrabold text-[#475569]">
                <LuClock className="text-[#1b452d] text-2xl" />
                <span>Open until 22:00</span>
              </div>
              <div className="flex items-center gap-5 text-[17px] font-extrabold text-[#475569]">
                <LuPhone className="text-[#1b452d] text-2xl" />
                <span>{selectedRestaurant.phone || "468897305"}</span>
              </div>
              <button 
                className="flex items-center gap-5 text-[17px] font-extrabold text-[#475569] hover:text-[#1b452d] transition-colors text-left"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`, '_blank')}
              >
                <LuNavigation className="text-[#1b452d] text-2xl" />
                <span>4 min • 1.2km</span>
              </button>
            </div>
          </div>

          <button 
            className="w-full bg-[#f8faf9] py-6 flex items-center justify-center border-t border-gray-100 transition-colors"
            onClick={() => onViewDetail && onViewDetail(selectedRestaurant)}
          >
            <span className="text-[#1b452d] text-base font-black flex items-center gap-1 opacity-90">
              View Full Details ›
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
