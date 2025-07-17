
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp opacity-0 [animation-delay:0.2s]">
          Explore the <span className="gradient-text">World</span> with Us
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fadeInUp opacity-0 [animation-delay:0.4s]">
          Curated experiences. Unforgettable memories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp opacity-0 [animation-delay:0.6s]">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full hover-glow group"
          >
            Plan Your Trip
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="glass-effect text-white border-white hover:bg-white hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300"
          >
            Browse Packages
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
};

export default Hero;
