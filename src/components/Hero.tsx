
import { ChevronDown, ArrowRight, Clock, Shield, Hotel, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import FloatingElements from "./FloatingElements";
import TypingAnimation from "./TypingAnimation";

const Hero = () => {
  const miniFeatures = [
    { icon: Clock, text: "24/7 Support" },
    { icon: Shield, text: "Visa Assistance" },
    { icon: Hotel, text: "Curated Stays" },
    { icon: MapPin, text: "Flexible Packages" },
  ];

  return (
    <section id="home" className="relative h-screen flex flex-col overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Background Image with Enhanced Parallax Effect */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
      
      {/* Floating Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          {/* Enhanced Headline with Typing Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fadeInUp opacity-0 [animation-delay:0.8s]">
            Discover the World.{" "}
            <br className="hidden sm:block" />
            One <TypingAnimation /> at a Time.
          </h1>
          
          {/* Enhanced Subtext */}
          <p className="text-lg md:text-2xl mb-10 opacity-90 animate-fadeInUp opacity-0 [animation-delay:1s] max-w-3xl mx-auto leading-relaxed">
            Custom curated tours for every kind of traveler. 
            <br className="hidden md:block" />
            <span className="text-accent font-medium">Your perfect adventure awaits.</span>
          </p>
          
          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp opacity-0 [animation-delay:1.2s]">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-10 py-4 text-lg rounded-full hover-glow group relative overflow-hidden transition-all duration-300"
            >
              <span className="relative z-10">Explore Packages</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="glass-effect text-white border-2 border-white/50 hover:bg-white hover:text-primary px-10 py-4 text-lg rounded-full transition-all duration-300 group"
            >
              <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Speak to Advisor
            </Button>
          </div>
          
          {/* Mini Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fadeInUp opacity-0 [animation-delay:1.4s]">
            {miniFeatures.map((feature, index) => (
              <div 
                key={feature.text}
                className="flex flex-col items-center text-center animate-fadeInUp opacity-0 group cursor-pointer"
                style={{ animationDelay: `${1.6 + index * 0.1}s` }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-accent" />
                </div>
                <span className="text-sm md:text-base font-medium opacity-90 group-hover:text-accent transition-colors duration-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow">
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-70 mb-2 animate-fadeInUp opacity-0 [animation-delay:2s]">Scroll to explore</span>
          <ChevronDown className="h-8 w-8 opacity-80" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
