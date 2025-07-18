import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const BookingForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">▶</span>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="When will you travel?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">▶</span>
            </div>
          </div>
        </div>

        {/* People */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Users className="h-4 w-4" />
            People
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="How many people?"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">▶</span>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div>
          <Button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;