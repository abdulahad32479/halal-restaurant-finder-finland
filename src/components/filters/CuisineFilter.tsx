import { getCuisineColor } from "../../utils/cuisineColors";

interface CuisineFilterProps {
  cuisines: string[];
  selected: string;
  onSelect: (cuisine: string) => void;
}

export default function CuisineFilter({ cuisines, selected, onSelect }: CuisineFilterProps) {
  const allCuisines = ["Turkish", "Arab", "Pakistani", "Open Now"]; // Hardcoded for mockup fidelity as requested
  
  return (
    <div className="cuisine-filter flex gap-3 mb-6">
      {allCuisines.map((cuisine) => {
        const isActive = cuisine === selected;
        return (
          <button
            key={cuisine}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
              isActive 
                ? "bg-[#1b452d] text-white shadow-md" 
                : "bg-[#e2e8f0] text-[#475569]"
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
