
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
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="space-y-8">
            <div className="text-white mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-orange-300">Our Services</span>
              </h2>
              <p className="text-xl opacity-90">
                We're committed to making your travel dreams come true with exceptional service and unforgettable experiences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-6 glass-effect rounded-xl hover:bg-white hover:bg-opacity-20 transition-all duration-300 animate-slideInLeft opacity-0"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-white opacity-80 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative animate-slideInRight opacity-0 [animation-delay:0.4s]">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Travel Experience"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
            </div>
            
            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">5K+</div>
                  <div className="text-sm text-gray-600">Happy Travelers</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">50+</div>
                  <div className="text-sm text-gray-600">Destinations</div>
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
