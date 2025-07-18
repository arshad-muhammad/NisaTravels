
import { ChevronDown, ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with enhanced overlay */}
      <div 
        className="absolute inset-0 parallax-bg scale-110"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse [animation-delay:0.5s]"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/5 right-1/4 w-1 h-1 bg-white/35 rounded-full animate-pulse [animation-delay:1.5s]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fadeInUp opacity-0 [animation-delay:0.1s]">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-sm font-medium">Premium Travel Experiences</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fadeInUp opacity-0 [animation-delay:0.2s] leading-tight">
          Journey to the 
          <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Extraordinary
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fadeInUp opacity-0 [animation-delay:0.4s] max-w-3xl mx-auto leading-relaxed">
          Experience the world through curated adventures designed for discerning travelers. 
          <span className="block text-lg mt-2 text-white/80">Every moment crafted, every detail perfected.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp opacity-0 [animation-delay:0.6s]">
          <Button 
            size="lg" 
            className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 group"
          >
            <span className="relative z-10 flex items-center">
              Start Your Adventure
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="relative backdrop-blur-md bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 px-10 py-5 text-lg rounded-full transition-all duration-500 hover:scale-105 hover:shadow-xl group"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Watch Our Story
          </Button>
        </div>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-white/80 animate-fadeInUp opacity-0 [animation-delay:0.8s]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">50,000+ Happy Travelers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse [animation-delay:0.5s]"></div>
            <span className="text-sm">120+ Destinations</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse [animation-delay:1s]"></div>
            <span className="text-sm">Award-Winning Service</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider opacity-70">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
