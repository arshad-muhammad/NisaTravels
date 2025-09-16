
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import BookingForm from "./BookingForm";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <>
      <Navigation />
      <section id="hero-section" className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden pt-16">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-8"
            >
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Discover Your
                <br />
                Next{" "}
                <span className="gradient-text">
                  Adventure
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Embark on unforgettable journeys with expert guidance, curated experiences, 
                and seamless travel planning designed just for you.
              </p>
              
              <div className="flex gap-4">
                <Button className="bg-black text-white px-8 py-6 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
                  Start Planning
                </Button>
                <Button variant="outline" className="px-8 py-6 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all duration-300">
                  Watch Video
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-8">
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="text-sm text-gray-600">
                    Trustpilot
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-sm text-gray-600">
                  <div className="font-semibold">10K+</div>
                  Happy Travelers
                </div>
              </div>
            </motion.div>

            {/* Right side - Plane Animation */}
            <div className="relative h-[400px] hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  y: [0, -20, 0]
                }}
                transition={{ 
                  duration: 1,
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-[400px]">
                  <img 
                    src="/plane.svg" 
                    alt="Airplane"
                    className="w-full h-auto"
                  />
                  
                  {/* Animated Trail */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ 
                      width: "50%", 
                      opacity: [0, 0.15, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="absolute top-1/2 -left-1/2 h-1 bg-gradient-to-r from-transparent via-primary-500/20 to-primary-500/40 transform -translate-y-1/2"
                  />

                  {/* Cloud Particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ 
                        x: -200,
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{ 
                        duration: 3,
                        delay: i * 1,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute top-1/2 left-0 transform -translate-y-1/2"
                    >
                      <div className="w-16 h-8 bg-white rounded-full blur-sm opacity-60" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16"
          >
            <BookingForm />
          </motion.div>
        </div>

        {/* Background Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-[20%] w-20 h-10 bg-white/60 rounded-full blur-sm"
          />
          <motion.div 
            animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/3 left-[15%] w-16 h-8 bg-white/50 rounded-full blur-sm"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
