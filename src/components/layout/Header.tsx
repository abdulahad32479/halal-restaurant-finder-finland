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
    <header className="header px-8 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-[1000] h-[72px]">
      {/* Brand Logo */}
      <div className="flex items-center gap-1.5 cursor-pointer select-none min-w-[200px]">
        <span className="text-2xl font-heading font-black tracking-tight text-[#2a6f44]">Verdant</span>
        <span className="text-2xl font-heading font-black tracking-tight text-black">Halal</span>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex-1 flex items-center justify-start gap-10 h-full ml-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`h-full relative px-1 font-heading text-[15px] font-bold tracking-tight transition-colors flex items-center ${
              activeTab === tab ? "text-[#113320]" : "text-[#94a3b8] hover:text-[#475569]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#113320] rounded-t-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Search & Actions */}
      <div className="flex items-center gap-4">
        <div className="search-bar group h-10 w-[280px] bg-[#f0f3f1] border-none rounded-full px-5 flex items-center">
          <input
            type="text"
            placeholder="Search Helsinki..."
            className="flex-1 bg-transparent border-none outline-none text-[13px] font-medium text-[#113320] placeholder:text-[#94a3b8]"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <LuSearch className="text-[#94a3b8] text-lg group-focus-within:text-[#113320] transition-colors" />
        </div>

        <button 
          onClick={handleLocate}
          disabled={locating}
          className="h-10 px-5 bg-[#113320] hover:bg-[#1b452d] text-white rounded-full flex items-center gap-2 text-[13px] font-bold shadow-lg shadow-green-900/10 transition-all active:scale-95 disabled:opacity-70"
        >
          <LuNavigation className={`text-[14px] ${locating ? 'animate-pulse' : ''}`} />
          Near Me
        </button>

        <div className="h-10 w-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-[#113320] text-xl shadow-sm cursor-pointer hover:shadow-md transition-all">
          <LuUser />
        </div>
      </div>
    </header>
  );
}
