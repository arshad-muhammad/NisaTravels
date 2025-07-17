
import { MapPin, Clock, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most loved travel packages, handpicked for unforgettable experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <Card 
              key={pkg.id} 
              className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer animate-scaleIn opacity-0"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{pkg.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                  {pkg.price}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">{pkg.title}</h3>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">{pkg.duration}</span>
                </div>
                
                <div className="space-y-2">
                  {pkg.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPackages;
