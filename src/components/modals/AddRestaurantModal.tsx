import { useState } from "react";
import { LuX, LuPlus, LuMapPin, LuUtensils, LuShieldCheck, LuGlobe, LuPhone, LuClock } from "react-icons/lu";

interface AddRestaurantModalProps {
  onClose: () => void;
}

export default function AddRestaurantModal({ onClose }: AddRestaurantModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(onClose, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative h-32 bg-[#1b452d] flex flex-col items-center justify-center text-white px-8">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 transition-colors"
          >
            <LuX className="text-xl" />
          </button>
          <h2 className="text-2xl font-extrabold tracking-tight">Add New Restaurant</h2>
          <p className="text-[#d0ebd8] text-sm font-medium mt-1">Help us grow the Halal community in Finland</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in-90 duration-500">
              <div className="h-20 w-20 bg-green-100 flex items-center justify-center rounded-full mb-4">
                <LuShieldCheck className="text-4xl text-[#1b452d]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Successfully Submitted!</h3>
              <p className="text-gray-500 max-w-xs mt-2">Thank you! Our moderators will review the details shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Restaurant Name</label>
                  <div className="relative">
                    <LuUtensils className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1b452d]/20 focus:bg-white border-transparent focus:border-[#d0ebd8] transition-all"
                      placeholder="e.g. Sultan's Feast"
                    />
                  </div>
                </div>

                {/* Cuisine */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Cuisine Type</label>
                  <div className="relative">
                    <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1b452d]/20 focus:bg-white border-transparent focus:border-[#d0ebd8] transition-all appearance-none cursor-pointer">
                      <option>Turkish</option>
                      <option>Arab</option>
                      <option>Pakistani</option>
                      <option>Indian</option>
                      <option>Syrian</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Location Address</label>
                <div className="relative">
                  <LuMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1b452d]/20 focus:bg-white border-transparent focus:border-[#d0ebd8] transition-all"
                    placeholder="e.g. Mannerheimintie 12, Helsinki"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Website (Optional)</label>
                  <div className="relative">
                    <LuGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1b452d]/20 focus:bg-white border-transparent focus:border-[#d0ebd8] transition-all"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Halal Status</label>
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1b452d]/20 focus:bg-white border-transparent focus:border-[#d0ebd8] transition-all appearance-none cursor-pointer">
                    <option>Fully Halal</option>
                    <option>Halal Certified</option>
                    <option>Halal Options Only</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 mt-4 bg-[#1b452d] text-white rounded-[20px] font-extrabold text-sm flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-[#1b452d]/30 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <LuPlus className="text-xl" />
                    Submit Restaurant
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
