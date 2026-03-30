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
    <div className="absolute bottom-12 right-12 z-1000 flex flex-col gap-6 items-center">
      {/* Zoom Controls */}
      <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/50 overflow-hidden group">
        <button 
          className="h-16 w-16 flex items-center justify-center text-[#113320] text-3xl active:bg-gray-100 transition-all border-b border-gray-100/50 hover:bg-white"
          onClick={() => map.zoomIn()}
          aria-label="Zoom in"
        >
          <LuPlus />
        </button>
        <button 
          className="h-16 w-16 flex items-center justify-center text-[#113320] text-3xl active:bg-gray-100 transition-all hover:bg-white"
          onClick={() => map.zoomOut()}
          aria-label="Zoom out"
        >
          <LuMinus />
        </button>
      </div>

      {/* Locate Button */}
      <button 
        className="h-16 w-16 bg-[#113320] rounded-3xl shadow-2xl shadow-[#113320]/30 flex items-center justify-center text-white text-3xl hover:bg-[#1b452d] hover:-translate-y-1 active:scale-95 transition-all duration-300"
        onClick={() => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
              map.flyTo([pos.coords.latitude, pos.coords.longitude], 14, { duration: 2 });
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

      {/* Floating Selection Card - Pixel Perfect Match */}
      {selectedRestaurant && (
        <div className="absolute top-12 left-12 z-1000 w-80 bg-white rounded-3xl shadow-2xl shadow-black/10 border border-white overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-8 py-8">
            <div className="flex items-start gap-4 mb-8">
              <div className="h-14 w-14 bg-[#113320] rounded-2xl flex items-center justify-center text-white text-2xl shrink-0">
                <LuUtensils />
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#94a3b8] uppercase mb-2.5">SELECTED RESULT</span>
                <h3 className="text-[26px] font-heading font-black text-[#113320] leading-[1.1] tracking-tight">{selectedRestaurant.name}</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-[14px] font-bold text-[#113320]">
                <LuClock className="text-lg" />
                <span>Open until 22:00</span>
              </div>
              
              <div className="flex items-center gap-4 text-[14px] font-bold text-[#113320]">
                <LuPhone className="text-lg" />
                <span>{selectedRestaurant.phone || "+358 40 123 4567"}</span>
              </div>

              <div className="flex items-center gap-4 text-[14px] font-bold text-[#113320]">
                <LuNavigation className="text-lg" />
                <span>4 min • 1.2km</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              <button 
                className="w-full h-12 text-white rounded-2xl flex items-center justify-center gap-3 text-[14px] font-bold shadow-lg transition-all active:scale-95"
                style={{ backgroundColor: '#113320' }}
                onClick={() => onViewDetail && onViewDetail(selectedRestaurant)}
              >
                View Details
              </button>
              <button 
                className="w-full h-12 bg-[#f0f3f1] hover:bg-white text-[#113320] border border-gray-100 rounded-2xl flex items-center justify-center gap-3 text-[14px] font-bold transition-all active:scale-95"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`, '_blank')}
              >
                <LuNavigation className="text-lg" />
                Get Directions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
