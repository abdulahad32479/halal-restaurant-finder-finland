import { useState, useEffect } from "react";
import { useRestaurants } from "./hooks/useRestaurants";
import { useFilters } from "./hooks/useFilters";
import { Restaurant } from "./types/restaurant";
import Header from "./components/layout/Header";
import LeftNav from "./components/layout/LeftNav";
import RestaurantList from "./components/layout/RestaurantList";
import RestaurantDetail from "./components/cards/RestaurantDetail";
import MapView from "./components/map/MapView";
import AddRestaurantModal from "./components/modals/AddRestaurantModal";
import EmptyState from "./components/layout/EmptyState";
import { LuHeart, LuSettings, LuBuilding } from "react-icons/lu";

export default function Home() {
  const { restaurants, loading } = useRestaurants();
  const {
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    filteredRestaurants,
    cuisineTypes,
  } = useFilters(restaurants);

  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  const [activeTab, setActiveTab] = useState("Discover");
  const [activeSection, setActiveSection] = useState("restaurants");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMobileMapView, setIsMobileMapView] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Favorites logic
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("halal-finder-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("halal-finder-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  function handleRestaurantSelect(restaurant: Restaurant) {
    setSelectedRestaurant(restaurant);
    // When selecting on map/list, we show the floating card or highlight
    // We only go to full detail view if they click "View Details"
    setIsDetailView(false);
  }

  function handleViewDetail(restaurant: Restaurant) {
    setSelectedRestaurant(restaurant);
    setIsDetailView(true);
  }

  function handleCloseDetail() {
    setSelectedRestaurant(null);
  }

  function handleLocate(lat: number, lng: number) {
    setUserLocation({ lat, lng });
  }

  // Find index in original restaurants array for consistent images
  function getOriginalIndex(r: Restaurant) {
    return restaurants.indexOf(r);
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "Discover") setActiveSection("restaurants");
    if (tab === "Favorites") setActiveSection("favorites");
    if (tab === "Recent") setActiveSection("restaurants"); // Simplified
    setIsDetailView(false);
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLocate={handleLocate}
      />

      <div className="app-body overflow-hidden flex">
        {/* Left Nav — hidden on mobile */}
        <div className="left-nav-wrapper h-full border-r border-gray-100 bg-[#f0f8f3]">
          <LeftNav 
            onAddClick={() => setIsAddModalOpen(true)} 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <main className="flex-1 relative overflow-hidden flex">
          {/* Center Panel (List) - Hide when isDetailView is active AND section is NOT restaurants */}
          {!isDetailView && activeSection === "restaurants" && (
            <div className="center-panel h-full border-r border-gray-100 shadow-sm">
              <RestaurantList 
                restaurants={filteredRestaurants} 
                allRestaurants={restaurants}
                selectedRestaurant={selectedRestaurant}
                onSelect={handleRestaurantSelect}
                cuisines={cuisineTypes}
                selectedCuisine={selectedCuisine}
                onCuisineChange={setSelectedCuisine}
                loading={loading}
                onViewDetail={handleViewDetail}
              />
            </div>
          )}

          {/* Other Views Placeholder */}
          {!isDetailView && activeSection !== "restaurants" && (
            <div className="center-panel h-full border-r border-gray-100 shadow-sm bg-white">
              {activeSection === "mosques" && (
                <EmptyState 
                  title="Mosques" 
                  description="We are currently mapping Finnish mosques. This feature will be available in the next update!"
                  icon={<LuBuilding />}
                />
              )}
              {activeSection === "favorites" && (
                <div className="h-full overflow-y-auto">
                   <RestaurantList 
                    restaurants={restaurants.filter(r => favorites.includes(r.id))} 
                    allRestaurants={restaurants}
                    selectedRestaurant={selectedRestaurant}
                    onSelect={handleRestaurantSelect}
                    cuisines={cuisineTypes}
                    selectedCuisine="All"
                    onCuisineChange={() => {}}
                    loading={loading}
                    onViewDetail={handleViewDetail}
                  />
                  {favorites.length === 0 && (
                    <div className="mt-[-100px]">
                      <EmptyState 
                        title="No Favorites Yet" 
                        description="Your saved restaurants and mosques will appear here. Start exploring!"
                        icon={<LuHeart />}
                      />
                    </div>
                  )}
                </div>
              )}
              {activeSection === "settings" && (
                <EmptyState 
                  title="Settings" 
                  description="Customize your experience, manage preferences, and localization settings."
                  icon={<LuSettings />}
                />
              )}
            </div>
          )}
          {/* Split view: Map + Details */}
          <div className="flex-1 h-full relative flex">
            <div className={`${isDetailView ? 'w-1/2' : 'w-full'} h-full transition-all duration-500`}>
              <MapView 
                restaurants={filteredRestaurants} 
                onRestaurantSelect={handleRestaurantSelect}
                selectedRestaurant={selectedRestaurant}
                userLocation={userLocation}
                onViewDetail={handleViewDetail}
              />
            </div>

            {isDetailView && selectedRestaurant && (
              <div className="w-1/2 h-full border-l border-gray-100 bg-white animate-in slide-in-from-right duration-500 z-10">
                <RestaurantDetail 
                  restaurant={selectedRestaurant} 
                  onClose={() => setIsDetailView(false)}
                  index={getOriginalIndex(selectedRestaurant)}
                  isFavorite={favorites.includes(selectedRestaurant.id)}
                  onToggleFavorite={() => toggleFavorite(selectedRestaurant.id)}
                />
              </div>
            )}

            {/* Mobile View Toggle */}
            <button
              className="mobile-map-toggle lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2"
              onClick={() => setIsMobileMapView(!isMobileMapView)}
              aria-label="Toggle map view"
            >
              {isMobileMapView ? "📋 List" : "🗺 Map"}
            </button>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav lg:hidden">
        <button
          className={`mobile-bottom-nav__item ${activeSection === "restaurants" ? "mobile-bottom-nav__item--active" : ""}`}
          onClick={() => { setActiveSection("restaurants"); setIsMobileMapView(false); }}
        >
          <span>🍽</span>
          <span>Explore</span>
        </button>
        <button
          className={`mobile-bottom-nav__item ${isMobileMapView ? "mobile-bottom-nav__item--active" : ""}`}
          onClick={() => setIsMobileMapView(true)}
        >
          <span>🗺</span>
          <span>Map</span>
        </button>
        <button
          className={`mobile-bottom-nav__item ${activeSection === "favorites" ? "mobile-bottom-nav__item--active" : ""}`}
          onClick={() => { setActiveSection("favorites"); setIsMobileMapView(false); }}
        >
          <span>❤</span>
          <span>Saved</span>
        </button>
        <button
          className={`mobile-bottom-nav__item ${activeSection === "settings" ? "mobile-bottom-nav__item--active" : ""}`}
          onClick={() => { setActiveSection("settings"); setIsMobileMapView(false); }}
        >
          <span>⚙</span>
          <span>Settings</span>
        </button>
      </nav>

      {/* Modals */}
      {isAddModalOpen && (
        <AddRestaurantModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
