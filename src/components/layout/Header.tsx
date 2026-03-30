import { useState } from "react";
import { LuSearch, LuNavigation, LuUser } from "react-icons/lu";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLocate: (lat: number, lng: number) => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
  activeTab,
  onTabChange,
  onLocate,
}: HeaderProps) {
  const [locating, setLocating] = useState(false);
  const TABS = ["Discover", "Favorites", "Recent"];

  async function handleLocate() {
    if ("geolocation" in navigator) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocate(position.coords.latitude, position.coords.longitude);
          setLocating(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setLocating(false);
        }
      );
    }
  }

  return (
    <header className="header justify-between">
      <div className="header__logo flex flex-col -gap-1">
        <h1 className="text-2xl font-heading font-black text-[#113320] leading-none tracking-tighter uppercase italic">
          Verdant<span className="text-[#2a6f44] not-italic">.</span>
        </h1>
        <span className="text-[10px] font-black tracking-[0.3em] text-[#94a3b8] uppercase ml-0.5">HALAL FINDER</span>
      </div>
      
      {/* Main Tabs */}
      <nav className="header__nav px-8" aria-label="Main navigation">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`header__nav-tab font-heading font-black text-[13px] tracking-widest uppercase ${activeTab === tab ? "header__nav-tab--active" : ""}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="header__actions gap-6">
        <div className="search-bar h-12 bg-[#f8faf9] border-gray-100">
          <LuSearch className="search-bar__icon text-lg" />
          <input
            type="text"
            className="search-bar__input font-medium"
            placeholder="Search Helsinki..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search restaurants"
          />
        </div>

        <button 
          className="near-me-btn h-12 px-6 rounded-2xl bg-[#113320] hover:bg-[#1b452d] font-heading font-black tracking-wider uppercase text-[11px] shadow-xl shadow-[#113320]/20 active:scale-95 transition-all"
          onClick={handleLocate}
          disabled={locating}
          aria-label="Find restaurants near me"
        >
          <LuNavigation className={`near-me-btn__icon text-base ${locating ? 'animate-pulse' : ''}`} />
          <span>Near Me</span>
        </button>

        <button className="h-12 w-12 bg-[#f1f5f9] text-[#113320] flex items-center justify-center rounded-2xl hover:bg-[#e2e8f0] transition-all active:scale-90" aria-label="User profile">
          <LuUser className="text-xl" />
        </button>
      </div>
    </header>
  );
}
