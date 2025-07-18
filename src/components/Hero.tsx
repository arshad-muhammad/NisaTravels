
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
import BookingForm from "./BookingForm";

const Hero = () => {
  return (
    <>
      <Navigation />
      <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-16">
        {/* 3D Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Earth/Globe */}
          <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-400 to-green-400 rounded-full shadow-2xl animate-float">
            <div className="absolute inset-4 bg-gradient-to-br from-green-300 to-blue-300 rounded-full">
              <div className="absolute top-8 left-8 w-12 h-12 bg-green-500 rounded-full opacity-80"></div>
              <div className="absolute bottom-16 right-12 w-16 h-16 bg-blue-600 rounded-full opacity-70"></div>
              <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-600 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Airplane */}
          <div className="absolute top-32 right-32 w-16 h-4 bg-white rounded-full shadow-lg animate-fly">
            <div className="absolute -top-1 left-8 w-8 h-6 bg-white rounded-full"></div>
            <div className="absolute -bottom-1 left-8 w-8 h-6 bg-white rounded-full"></div>
          </div>

          {/* Clouds */}
          <div className="absolute top-40 right-20 w-16 h-8 bg-white rounded-full shadow-md opacity-80 animate-float-slow"></div>
          <div className="absolute top-48 right-40 w-12 h-6 bg-white rounded-full shadow-md opacity-60 animate-float-slower"></div>
          <div className="absolute top-36 right-60 w-20 h-10 bg-white rounded-full shadow-md opacity-70 animate-float"></div>

          {/* Decorative elements */}
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full shadow-lg animate-bounce-slow"></div>
          <div className="absolute bottom-60 left-40 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg animate-pulse"></div>
          
          {/* Location pin */}
          <div className="absolute top-1/2 right-20 w-8 h-8 bg-red-500 rounded-full shadow-lg animate-pulse">
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-red-500"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Lets Plan Your
                <br />
                Perfect{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Journey
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
                Plan and book your perfect trip with expert advice, travel tips, destination 
                information and inspiration from us.
              </p>
              
              <Button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
                Discover Now
              </Button>
            </div>

            {/* Right side is handled by absolute positioned 3D elements */}
            <div className="hidden lg:block"></div>
          </div>

          {/* Booking Form */}
          <div className="mt-16">
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
