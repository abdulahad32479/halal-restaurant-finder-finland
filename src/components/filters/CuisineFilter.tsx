import { LuUtensils, LuFlame, LuGlobe, LuLeaf } from "react-icons/lu";

interface CuisineFilterProps {
  cuisines: string[];
  selected: string;
  onSelect: (cuisine: string) => void;
}

const CUISINE_ICONS: Record<string, any> = {
  "Turkish": <LuFlame />,
  "Arab": <LuGlobe />,
  "Pakistani": <LuUtensils />,
  "All": <LuLeaf />,
};

export default function CuisineFilter({ cuisines, selected, onSelect }: CuisineFilterProps) {
  const allCuisines = ["Turkish", "Arab", "Pakistani", "Open Now"];
  
  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {allCuisines.map((cuisine) => {
        const isActive = cuisine === selected || (cuisine === "Turkish" && selected === "Turkish"); // Default active for mockup mimicry
        return (
          <button
            key={cuisine}
            className={`px-8 py-2.5 rounded-full font-heading text-[15px] font-bold transition-all whitespace-nowrap ${
              isActive 
                ? "bg-[#113320] text-white shadow-lg" 
                : "bg-[#e2e8f0] text-[#113320]/60 hover:text-[#113320]"
            }`}
            onClick={() => onSelect(cuisine)}
          >
            {cuisine}
          </button>
        );
      })}
    </div>
  );
}
