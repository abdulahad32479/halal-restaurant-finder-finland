import { ReactNode } from "react";
import { LuSearch } from "react-icons/lu";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ 
  icon = <LuSearch />, 
  title, 
  description, 
  action 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center h-full animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-[#f0f8f3] rounded-[32px] flex items-center justify-center text-[#1b452d] text-4xl mb-8 shadow-xl shadow-green-900/5">
        {icon}
      </div>
      <h3 className="text-2xl font-heading font-black text-[#113320] mb-3 uppercase tracking-tight italic">
        {title}
      </h3>
      <p className="text-[#64748b] font-medium max-w-[280px] leading-relaxed mb-8">
        {description}
      </p>
      {action && (
        <div className="mt-2">
          {action}
        </div>
      )}
    </div>
  );
}
