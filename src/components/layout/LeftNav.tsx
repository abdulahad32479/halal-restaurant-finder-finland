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
    <aside className="left-nav-wrapper h-full bg-[#f0f7f4] border-r border-[#e2e8f0]">
      <div className="left-nav h-full flex flex-col px-6 py-8">
        {/* Brand Section */}
        <div className="mb-12">
          <h2 className="text-[22px] font-heading font-black text-[#113320] leading-tight tracking-tight">Nordic Concierge</h2>
          <p className="text-[12px] font-bold text-[#94a3b8] mt-2 uppercase tracking-widest opacity-70">Halal Finder Finland</p>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-3 flex-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#e2f3e9] text-[#113320] font-bold shadow-sm scale-[1.02]" 
                    : "text-[#113320]/50 hover:text-[#113320] hover:bg-white/60"
                }`}
              >
                <span className={`text-[20px] transition-colors ${isActive ? "text-[#113320]" : "text-[#113320]/40"}`}>
                  {item.icon}
                </span>
                <span className="text-[15px] font-heading font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Action */}
        <div className="mt-auto pt-8 flex justify-center">
          <button 
            onClick={onAddClick}
            style={{ backgroundColor: '#113320' }}
            className="w-[200px] h-14 text-white rounded-2xl flex items-center justify-center gap-3 text-[14px] font-bold shadow-xl shadow-green-900/10 transition-all hover:brightness-110 active:scale-95 group"
          >
            <LuPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
            Add Restaurant
          </button>
        </div>
      </div>
    </aside>
  );
}
