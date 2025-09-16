import { Star, Moon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import UmrahVisaForm from "./UmrahVisaForm";

const UmrahVisa = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="umrah-visa" className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.hdwallpapers.in/download/great_mosque_of_mecca_4k_hd_jumma_mubarak-HD.jpg')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Animated Decorative Elements */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.8, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 right-20"
      >
        <Moon size={48} className="text-white fill-current" />
      </motion.div>

      {/* Animated Stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
        >
          <Sparkles className="text-white h-4 w-4" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Title */}
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Umrah Visa Services
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium">
            Begin your spiritual journey with our comprehensive Umrah visa services
          </p>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {[
              { title: "Fast Processing", desc: "Quick visa processing within 24-48 hours" },
              { title: "Expert Guidance", desc: "Step-by-step assistance throughout your journey" },
              { title: "Complete Package", desc: "All-inclusive packages with accommodation" },
              { title: "24/7 Support", desc: "Round-the-clock customer service" },
              { title: "Easy Documentation", desc: "Simplified documentation process" },
              { title: "Best Prices", desc: "Competitive rates and flexible payment options" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 space-y-6"
          >
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Ready to start your spiritual journey? Let us help you make it a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 transition-colors rounded-full text-lg px-8"
                onClick={() => setIsFormOpen(true)}
              >
                Apply Now
              </Button>
        </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Umrah Visa Application Form */}
      <UmrahVisaForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </section>
  );
};

export default UmrahVisa;