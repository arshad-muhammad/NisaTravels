
import { MapPin, Clock, Users, Star, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const packages = [
  {
    id: 1,
    title: "Bali Paradise",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "7 Days",
    highlights: ["All-inclusive", "Beach Resort", "Cultural Tours", "Private Guide"],
    rating: 4.9,
    price: "$1,299"
  },
  {
    id: 2,
    title: "Swiss Alps Adventure",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "5 Days",
    highlights: ["Mountain Views", "Hiking Trails", "Local Cuisine", "Cable Car Rides"],
    rating: 4.8,
    price: "$1,899"
  },
  {
    id: 3,
    title: "Tokyo Experience",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "6 Days",
    highlights: ["City Tours", "Traditional Temples", "Modern Culture", "Food Experience"],
    rating: 4.7,
    price: "$1,599"
  },
  {
    id: 4,
    title: "Safari Adventure",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: "8 Days",
    highlights: ["Wildlife Safari", "Luxury Camps", "Game Drives", "Photography Tours"],
    rating: 4.9,
    price: "$2,299"
  }
];

const PopularPackages = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-semibold text-blue-700">Handpicked Destinations</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent leading-tight">
            Popular Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Embark on extraordinary journeys to the world's most captivating destinations, 
            <span className="block text-lg mt-2">carefully curated for the modern explorer.</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] cursor-pointer animate-scaleIn opacity-0 hover:bg-white"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden">
                {/* Image with overlay gradient */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Rating badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-lg">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{pkg.rating}</span>
                  </div>
                  
                  {/* Price badge */}
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-lg font-bold shadow-lg">
                    {pkg.price}
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    <Clock className="inline h-3 w-3 mr-1" />
                    {pkg.duration}
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold">
                    View Details
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-6 relative">
                {/* Location and title */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Premium Experience</p>
                  </div>
                </div>
                
                {/* Highlights */}
                <div className="space-y-3">
                  {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                  {pkg.highlights.length > 3 && (
                    <div className="text-xs text-blue-600 font-medium">
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
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            View All Destinations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
