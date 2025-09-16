import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    coordinates: { x: 60, y: 40 },
    description: "Experience luxury and modernity in the heart of UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Marina"],
    type: "Popular"
  },
  {
    id: 2,
    name: "Abu Dhabi",
    coordinates: { x: 40, y: 50 },
    description: "Discover culture and heritage in the capital city",
    image: "https://images.unsplash.com/photo-1511700581673-4c78fa0cbec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attractions: ["Sheikh Zayed Mosque", "Ferrari World", "Louvre Abu Dhabi", "Corniche Beach"],
    type: "Popular"
  },
  {
    id: 3,
    name: "Sharjah",
    coordinates: { x: 65, y: 35 },
    description: "Explore art and culture in the cultural capital of UAE",
    image: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attractions: ["Sharjah Museum", "Blue Souk", "Al Noor Mosque", "Al Majaz Waterfront"],
    type: "Cultural"
  },
  {
    id: 4,
    name: "Ras Al Khaimah",
    coordinates: { x: 70, y: 20 },
    description: "Adventure and nature in the northernmost emirate",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attractions: ["Jebel Jais", "RAK Beach", "National Museum", "Dhayah Fort"],
    type: "Adventure"
  }
];

const routes = [
  {
    id: "route1",
    name: "Golden Triangle",
    path: "M60,40 L40,50 L65,35 Z",
    destinations: ["Dubai", "Abu Dhabi", "Sharjah"],
    duration: "7 Days",
    type: "Popular Tour"
  },
  {
    id: "route2",
    name: "Northern Adventure",
    path: "M60,40 L70,20",
    destinations: ["Dubai", "Ras Al Khaimah"],
    duration: "4 Days",
    type: "Adventure Tour"
  }
];

const InteractiveMap = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Popular", "Cultural", "Adventure"];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Explore Destinations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Interactive Travel Map
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and plan your perfect route across the UAE.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[600px] bg-primary-50 rounded-3xl overflow-hidden">
          {/* UAE Map Background */}
          <div className="absolute inset-0 bg-[url('/uae-map.svg')] bg-no-repeat bg-center bg-contain opacity-20"></div>

          {/* Routes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {routes.map((route) => (
              <motion.path
                key={route.id}
                d={route.path}
                stroke={selectedRoute?.id === route.id ? "#48b4dc" : "#94A3B8"}
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="cursor-pointer"
              />
            ))}
          </svg>

          {/* Destination Markers */}
          {destinations
            .filter(
              (dest) => activeFilter === "All" || dest.type === activeFilter
            )
            .map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${destination.coordinates.x}%`,
                  top: `${destination.coordinates.y}%`,
                }}
                onClick={() => setSelectedDestination(destination)}
              >
                <div className="relative">
                  <MapPin
                    className={`h-8 w-8 ${
                      selectedDestination?.id === destination.id
                        ? "text-primary"
                        : "text-gray-600"
                    }`}
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {destination.name}
                </div>
              </motion.div>
            ))}

          {/* Destination Info Modal */}
          <AnimatePresence>
            {selectedDestination && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-8 right-8 bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-auto"
              >
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="flex gap-6">
                  <div className="w-1/3">
                    <img
                      src={selectedDestination.image}
                      alt={selectedDestination.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedDestination.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {selectedDestination.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedDestination.attractions.map((attraction, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <Info className="h-4 w-4 text-blue-600" />
                          {attraction}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="bg-blue-600 text-white">
                    View Tours
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Legend */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Popular Destinations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Cultural Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Adventure Spots</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap; 