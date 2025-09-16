
import { MapPin, Clock, Users, Star, ArrowRight, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getPackages } from "@/lib/firebase";
import type { Package } from "@/lib/firebase";

const packages = [
  {
    id: 1,
    title: "Bali Paradise",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "7 Days",
    highlights: ["All-inclusive", "Beach Resort", "Cultural Tours", "Private Guide"],
    rating: 4.9,
    price: "$1,299",
    location: "Bali, Indonesia"
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "5 Days",
    highlights: ["Mountain Views", "Hiking Trails", "Local Cuisine", "Cable Car Rides"],
    rating: 4.8,
    price: "$1,899",
    location: "Swiss Alps, Switzerland"
  },
  {
    id: 3,
    title: "Tokyo Experience",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    highlights: ["City Tours", "Traditional Temples", "Modern Culture", "Food Experience"],
    rating: 4.7,
    price: "$1,599",
    location: "Tokyo, Japan"
  },
  {
    id: 4,
    title: "Safari Adventure",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "8 Days",
    highlights: ["Wildlife Safari", "Luxury Camps", "Game Drives", "Photography Tours"],
    rating: 4.9,
    price: "$2,299",
    location: "Serengeti, Tanzania"
  }
];

const PopularPackages = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setIsLoading(true);
      console.log('Loading packages from Firebase...');
      const data = await getPackages();
      console.log('Packages loaded:', data);
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setPackages(sortedData);
    } catch (error) {
      console.error('Error loading packages:', error);
      // Fallback to mock data if Firebase fails
      setPackages([
        {
          id: "1",
          title: "Bali Paradise",
          image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          duration: "7 Days",
          highlights: ["All-inclusive", "Beach Resort", "Cultural Tours", "Private Guide"],
          rating: 4.9,
          price: "$1,299",
          location: "Bali, Indonesia",
          createdAt: Date.now()
        },
        {
          id: "2",
          title: "Swiss Alps Adventure",
          image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          duration: "5 Days",
          highlights: ["Mountain Views", "Hiking Trails", "Local Cuisine", "Cable Car Rides"],
          rating: 4.8,
          price: "$1,899",
          location: "Swiss Alps, Switzerland",
          createdAt: Date.now()
        },
        {
          id: "3",
          title: "Tokyo Experience",
          image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          duration: "6 Days",
          highlights: ["City Tours", "Traditional Temples", "Modern Culture", "Food Experience"],
          rating: 4.7,
          price: "$1,599",
          location: "Tokyo, Japan",
          createdAt: Date.now()
        },
        {
          id: "4",
          title: "Safari Adventure",
          image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          duration: "8 Days",
          highlights: ["Wildlife Safari", "Luxury Camps", "Game Drives", "Photography Tours"],
          rating: 4.9,
          price: "$2,299",
          location: "Serengeti, Tanzania",
          createdAt: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fid => fid !== id)
        : [...prev, id]
    );
  };

  return (
    <section id="popular-packages" className="py-20">
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-2 mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-sm font-semibold text-primary-700">Handpicked Destinations</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Popular Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Embark on extraordinary journeys to the world's most captivating destinations, 
            <span className="block text-lg mt-2">carefully curated for the modern explorer.</span>
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">Loading packages...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card 
                className={`group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-0 shadow-xl transition-all duration-500 cursor-pointer ${
                  hoveredCard === pkg.id ? 'scale-[1.02] bg-white shadow-2xl' : ''
                }`}
                onMouseEnter={() => setHoveredCard(pkg.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative overflow-hidden">
                  {/* Image with overlay gradient */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pkg.id);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg z-10 transition-transform hover:scale-110"
                    >
                      <Heart 
                        className={`h-5 w-5 transition-colors ${
                          favorites.includes(pkg.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600'
                        }`}
                      />
                    </button>
                    
                    {/* Rating badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-lg">
                      <Star className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="text-sm font-bold text-gray-800">{pkg.rating}</span>
                    </div>
                    
                    {/* Price badge */}
                    <div className="absolute bottom-4 right-4 gradient-bg text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                      {pkg.price}
                    </div>
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {pkg.duration}
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6 relative">
                  {/* Location and title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {pkg.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{pkg.location}</p>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="space-y-3">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-center gap-3 text-sm text-gray-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="font-medium">{highlight}</span>
                      </motion.div>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <div className="text-xs text-primary font-medium cursor-pointer hover:text-primary-600">
                        +{pkg.highlights.length - 3} more experiences
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom action area */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Small Groups</span>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors duration-300" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        )}
        
        {/* Call to action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="gradient-bg hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <motion.div 
              className="flex items-center"
              whileHover={{ x: 5 }}
            >
              View All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularPackages;
