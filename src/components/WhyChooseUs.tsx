
import { Shield, Clock, MapPin, Users, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted by 5K+ Travelers",
    description: "Join thousands of satisfied customers who've experienced unforgettable journeys with us"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance ensures you're never alone on your adventure"
  },
  {
    icon: MapPin,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your preferences and budget"
  },
  {
    icon: Award,
    title: "Affordable Packages",
    description: "Best value for money with no hidden costs or surprise fees"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-600/20 to-purple-600/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-amber-400/10 to-transparent rounded-full blur-2xl animate-pulse [animation-delay:4s]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Left Side - Features */}
          <div className="space-y-10">
            <div className="text-white mb-12">
              <div className="inline-block bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full px-6 py-2 mb-6 border border-amber-400/30">
                <span className="text-sm font-semibold text-amber-300">Why Choose Us</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Experience 
                <span className="block gradient-text-secondary">Excellence</span>
                in Every Journey
              </h2>
              <p className="text-xl opacity-90 leading-relaxed max-w-lg">
                We're committed to making your travel dreams come true with exceptional service and unforgettable experiences that last a lifetime.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-6 p-6 glass-dark rounded-2xl hover:bg-white/10 transition-all duration-500 animate-slideInLeft opacity-0 hover:scale-105"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Enhanced Image */}
          <div className="relative animate-slideInRight opacity-0 [animation-delay:0.6s]">
            <div className="relative">
              {/* Main image with enhanced styling */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travel Experience"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Enhanced floating stats cards */}
              <div className="absolute -top-8 -left-8 card-premium p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">50K+</div>
                    <div className="text-sm text-gray-600 font-medium">Happy Travelers</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 card-premium p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">120+</div>
                    <div className="text-sm text-gray-600 font-medium">Destinations</div>
                  </div>
                </div>
              </div>
              
              {/* Additional floating element */}
              <div className="absolute top-1/2 -right-4 card-premium p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">4.9★</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
