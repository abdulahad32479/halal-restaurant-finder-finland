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
  return (
    <div className="flex justify-start lg:justify-center gap-2 lg:gap-4 mb-4 lg:mb-8 overflow-x-auto pb-4 no-scrollbar px-2">
      {cuisines.map((cuisine) => {
        const isActive = cuisine === selected;
        return (
          <button
            key={cuisine}
            className={`px-4 lg:px-8 py-2 rounded-full font-heading text-[12px] lg:text-[14px] font-bold transition-all whitespace-nowrap ${
              isActive 
                ? "bg-[#113320] text-white shadow-md" 
                : "bg-white text-[#113320]/70 border border-gray-200 hover:text-[#113320] hover:border-[#113320]/20"
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
