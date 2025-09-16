
import { Shield, Clock, MapPin, Users, Heart, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Trusted by 5K+ Travelers",
    description: "Join thousands of satisfied customers who've experienced unforgettable journeys with us",
    stats: "5,000+ Happy Customers"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance ensures you're never alone on your adventure",
    stats: "Always Available"
  },
  {
    icon: MapPin,
    title: "Custom Itineraries",
    description: "Personalized travel plans tailored to your preferences and budget",
    stats: "100% Customizable"
  },
  {
    icon: Award,
    title: "Affordable Packages",
    description: "Best value for money with no hidden costs or surprise fees",
    stats: "Best Price Guarantee"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced background with multiple gradients */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-900 to-primary-800"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/20 to-primary-600/30"></div>
      </motion.div>
      
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-transparent rounded-full blur-3xl"
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          {/* Left Side - Features */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white mb-12"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full px-6 py-2 mb-6 border border-amber-400/30"
              >
                <span className="text-sm font-semibold text-amber-300">Why Choose Us</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Experience 
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
                >
                  Excellence
                </motion.span>
                in Every Journey
              </h2>
              <p className="text-xl opacity-90 leading-relaxed max-w-lg">
                We're committed to making your travel dreams come true with exceptional service and unforgettable experiences that last a lifetime.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="group flex items-start gap-6 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25"
                    >
                      <feature.icon className="h-7 w-7 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full"
                      >
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs font-medium text-green-400">{feature.stats}</span>
                      </motion.div>
                    </div>
                    <p className="text-white/80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Enhanced Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image with enhanced styling */}
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-3 transition-all duration-700"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Travel Experience"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Image overlay content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.img
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          src={`https://i.pravatar.cc/40?img=${i}`}
                          alt={`User ${i}`}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-white"
                    >
                      <div className="font-semibold">Join 5000+ travelers</div>
                      <div className="text-sm opacity-80">Who trust our services</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced floating stats cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">50K+</div>
                    <div className="text-sm text-gray-600 font-medium">Happy Travelers</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-800">120+</div>
                    <div className="text-sm text-gray-600 font-medium">Destinations</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-1/2 -right-4 bg-white/90 backdrop-blur-lg p-4 rounded-xl shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">4.9★</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
