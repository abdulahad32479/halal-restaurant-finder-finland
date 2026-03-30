import { LuUtensils, LuHeart, LuSettings, LuBuilding, LuPlus } from "react-icons/lu";

interface LeftNavProps {
  onAddClick: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function LeftNav({ onAddClick, activeSection, onSectionChange }: LeftNavProps) {
  const navItems = [
    { label: "Restaurants", icon: <LuUtensils />, id: "restaurants" },
    { label: "Mosques", icon: <LuBuilding />, id: "mosques" },
    { label: "Favorites", icon: <LuHeart />, id: "favorites" },
    { label: "Settings", icon: <LuSettings />, id: "settings" },
  ];

  return (
    <aside className="left-nav-wrapper">
      <div className="left-nav h-full flex flex-col pt-4 pb-6 px-4 bg-[#f0f8f3] border-r border-[#d0ebd8]">
        {/* Brand */}
        <div className="mb-10 px-2 mt-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-[#1b452d] p-2.5 rounded-xl text-white shadow-lg shadow-green-900/10">
              <LuBuilding className="text-xl" />
            </div>
            <h2 className="left-nav__brand-title">Nordic Concierge</h2>
          </div>
          <span className="left-nav__brand-sub">Halal Finder Finland</span>
        </div>

        {/* Navigation Items */}
        <nav className="left-nav__items flex flex-col gap-1.5 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`left-nav__item ${activeSection === item.id ? "left-nav__item--active" : ""}`}
            >
              <span className="left-nav__item-icon">{item.icon}</span>
              <span className="left-nav__item-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer / Add Restaurant */}
        <div className="pt-6 border-t border-[#d0ebd8]">
          <button 
            onClick={onAddClick}
            className="btn-add-restaurant"
          >
            <LuPlus className="btn-add-restaurant__icon" />
            Add Restaurant
          </button>
        </div>
      </div>
    </aside>
  );
}
