
import { Heart, Mountain, Users, Crown, Camera, Waves } from "lucide-react";

const themes = [
  {
    id: 1,
    title: "Adventure",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Thrilling experiences for adrenaline seekers"
  },
  {
    id: 2,
    title: "Honeymoon",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Romantic getaways for couples"
  },
  {
    id: 3,
    title: "Family",
    icon: Users,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Fun-filled vacations for all ages"
  },
  {
    id: 4,
    title: "Luxury",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Premium experiences with world-class service"
  },
  {
    id: 5,
    title: "Photography",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Capture stunning moments in breathtaking locations"
  },
  {
    id: 6,
    title: "Beach",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Relax and unwind by pristine shores"
  }
];

const ExploreByTheme = () => {
  return (
    <section id="explore-themes" className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Explore by <span className="gradient-text">Theme</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect travel experience that matches your style and interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div 
              key={theme.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer animate-scaleIn opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={theme.image}
                  alt={theme.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <theme.icon className="h-12 w-12 text-orange-400 mb-2" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {theme.title}
                  </h3>
                  
                  <p className="text-sm opacity-90 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {theme.description}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-300">
                      View Packages
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreByTheme;
