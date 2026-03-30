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
    <div className="flex justify-center gap-4 mb-8 overflow-x-auto pb-2 no-scrollbar">
      {cuisines.map((cuisine) => {
        const isActive = cuisine === selected;
        return (
          <button
            key={cuisine}
            className={`px-10 py-3.5 rounded-full font-heading text-[15px] font-black transition-all whitespace-nowrap ${
              isActive 
                ? "bg-[#113320] text-white shadow-xl scale-[1.05]" 
                : "bg-white text-[#113320]/60 border border-gray-100 hover:text-[#113320] hover:bg-[#f0f8f3]"
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
