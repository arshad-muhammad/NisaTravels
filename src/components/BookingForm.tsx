import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { searchTrips } from "@/lib/gemini";
import type { SearchResult } from "@/lib/gemini";
import SearchResults from "./SearchResults";
import { useToast } from "@/components/ui/use-toast";
import { submitBooking } from "@/lib/firebase";

const popularDestinations = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ras Al Khaimah",
  "Fujairah"
];

const BookingForm = () => {
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { toast } = useToast();

  // Form state
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!destination || !date || !travelers) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to search for trips.",
        variant: "destructive"
      });
      return;
    }

    // Validate date
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
      toast({
        title: "Invalid date",
        description: "Please select a future date for your trip.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setShowResults(true);

    try {
      console.log("Searching for trips with:", { destination, date, travelers });
      
      // Save booking to Firebase
      await submitBooking({
        destination,
        date,
        travelers: parseInt(travelers, 10)
      });

      const results = await searchTrips({
        destination,
        date,
        travelers: parseInt(travelers, 10)
      });

      if (results.length === 0) {
        toast({
          title: "No packages found",
          description: "Try different search criteria or contact us for custom packages.",
          variant: "default"
        });
      }

      setSearchResults(results);
    } catch (error) {
      console.error("Error searching trips:", error);
      toast({
        title: "Error searching trips",
        description: "Please try again or contact our support team.",
        variant: "destructive"
      });
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDestinationClick = (dest: string) => {
    setDestination(dest);
  };

  return (
    <>
      <motion.div 
        className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Form Header */}
        <div className="flex items-center gap-3 mb-6">
                          <Search className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-gray-800">Search Your Trip</h3>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Destination */}
            <div 
              className={`space-y-2 relative ${activeField === 'destination' ? 'scale-[1.02] transition-transform' : ''}`}
              onFocus={() => setActiveField('destination')}
              onBlur={() => setActiveField(null)}
            >
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Destination
              </label>
              <div className="relative group">
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Date */}
            <div 
              className={`space-y-2 relative ${activeField === 'date' ? 'scale-[1.02] transition-transform' : ''}`}
              onFocus={() => setActiveField('date')}
              onBlur={() => setActiveField(null)}
            >
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Travel Date
              </label>
              <div className="relative group">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Travelers */}
            <div 
              className={`space-y-2 relative ${activeField === 'travelers' ? 'scale-[1.02] transition-transform' : ''}`}
              onFocus={() => setActiveField('travelers')}
              onBlur={() => setActiveField(null)}
            >
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Travelers
              </label>
              <div className="relative group">
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none"
                >
                  <option value="">Select travelers</option>
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5">5+ People</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-primary">▼</span>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button 
                type="submit"
                className="w-full bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 h-[52px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Popular Destinations */}
        <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium">Popular:</span>
          <div className="flex flex-wrap gap-3">
            {popularDestinations.map((place) => (
              <button
                key={place}
                onClick={() => handleDestinationClick(place)}
                className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {place}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search Results Modal */}
      <AnimatePresence>
        {showResults && (
          <SearchResults
            results={searchResults}
            isLoading={isLoading}
            onClose={() => setShowResults(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingForm;