import { Star, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const UmrahVisa = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2834&q=80')"
        }}
      >
        <div className="absolute inset-0 islamic-gradient opacity-85"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Crescent Moon */}
      <div className="absolute top-20 right-20 animate-crescent-float crescent-glow">
        <Moon 
          size={48} 
          className="text-[hsl(var(--umrah-gold))] fill-current opacity-80" 
        />
      </div>

      {/* Floating Stars */}
      <div className="absolute top-32 left-20 animate-star-twinkle">
        <Star 
          size={24} 
          className="text-[hsl(var(--umrah-gold))] fill-current opacity-70" 
        />
      </div>
      <div className="absolute bottom-40 right-32 animate-star-twinkle" style={{ animationDelay: '1s' }}>
        <Star 
          size={20} 
          className="text-[hsl(var(--umrah-gold))] fill-current opacity-60" 
        />
      </div>
      <div className="absolute top-1/3 left-32 animate-star-twinkle" style={{ animationDelay: '2s' }}>
        <Star 
          size={16} 
          className="text-[hsl(var(--umrah-gold))] fill-current opacity-50" 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fadeInUp">
        {/* Headline with Shimmer Effect */}
        <div className="relative mb-6">
          <h1 className="text-6xl md:text-8xl font-bold text-[hsl(var(--umrah-white))] mb-4 font-serif">
            <span className="relative inline-block">
              Umrah Visa
              <div className="absolute inset-0 animate-shimmer"></div>
            </span>
            <br />
            <span className="text-[hsl(var(--umrah-gold))] text-5xl md:text-7xl">
              Now Open
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-[hsl(var(--umrah-white))] mb-8 leading-relaxed max-w-2xl mx-auto opacity-90">
          Begin your spiritual journey with ease. Hassle-free visa, flights, and stay – all arranged with care.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col items-center space-y-4">
          <Button 
            size="lg"
            className="umrah-glow bg-[hsl(var(--umrah-gold))] hover:bg-[hsl(var(--umrah-gold-dark))] text-[hsl(var(--umrah-black))] font-semibold text-lg px-12 py-4 rounded-full border-2 border-[hsl(var(--umrah-gold))] transition-all duration-300"
          >
            Start Your Umrah Plan
          </Button>
          
          <p className="text-[hsl(var(--umrah-gold))] text-sm font-medium animate-pulse">
            Limited slots available – Apply now
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center items-center space-x-4 opacity-60">
          <div className="w-16 h-0.5 bg-[hsl(var(--umrah-gold))]"></div>
          <Star size={16} className="text-[hsl(var(--umrah-gold))] fill-current" />
          <div className="w-16 h-0.5 bg-[hsl(var(--umrah-gold))]"></div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(var(--umrah-gold))/0.1] to-transparent"></div>
    </section>
  );
};

export default UmrahVisa;