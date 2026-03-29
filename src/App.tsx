import { useState } from "react";
import { useRestaurants } from "./hooks/useRestaurants";
import { useFilters } from "./hooks/useFilters";
import { Restaurant } from "./types/restaurant";
import Header from "./components/layout/Header";
import LeftNav from "./components/layout/LeftNav";
import RestaurantList from "./components/layout/RestaurantList";
import RestaurantDetail from "./components/cards/RestaurantDetail";
import MapView from "./components/map/MapView";
import AddRestaurantModal from "./components/modals/AddRestaurantModal";

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

  return (
    <div className="app-layout">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLocate={handleLocate}
      />

      <div className="app-body overflow-hidden">
        {/* Left Nav — hidden on mobile */}
        <div className="left-nav-wrapper h-full">
          <LeftNav onAddClick={() => setIsAddModalOpen(true)} />
        </div>

        {/* Center: restaurant list or detail */}
        <div className="center-panel">
          {activeSection !== "restaurants" ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-gray-500">
              <span className="text-4xl mb-4">✨</span>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Coming Soon</h2>
              <p>We're working hard to bring this feature to the Finnish Halal community!</p>
              <button 
                className="mt-6 px-6 py-2 bg-[#1b452d] text-white rounded-full font-semibold"
                onClick={() => setActiveSection("restaurants")}
              >
                Back to Restaurants
              </button>
            </div>
          ) : isDetailView && selectedRestaurant ? (
            <RestaurantDetail
              restaurant={selectedRestaurant}
              onClose={handleCloseDetail}
              index={getOriginalIndex(selectedRestaurant)}
            />
          ) : (
            <RestaurantList
              restaurants={filteredRestaurants}
              allRestaurants={restaurants}
              selectedRestaurant={selectedRestaurant}
              onSelect={handleRestaurantSelect}
              cuisines={cuisineTypes}
              selectedCuisine={selectedCuisine}
              onCuisineChange={setSelectedCuisine}
              loading={loading}
            />
          )}
        </div>

        {/* Right: Map */}
        <div className="map-panel">
          <MapView
            restaurants={filteredRestaurants}
            selectedRestaurant={selectedRestaurant}
            onRestaurantSelect={handleRestaurantSelect}
            userLocation={userLocation}
            onViewDetail={handleViewDetail}
          />

          {/* Mobile toggle button */}
          <button
            className="mobile-map-toggle"
            onClick={() => setIsMobileMapView(!isMobileMapView)}
            aria-label="Toggle map view"
          >
            {isMobileMapView ? "📋 List" : "🗺 Map"}
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
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
