import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              Booking <span className="text-blue-500">Adventures.</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary font-medium border-b-2 border-primary pb-1">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Destination
            </a>
            <a href="#" className="text-gray-600 hover:text-primary font-medium transition-colors">
              Tours
            </a>
          </div>

          {/* Login Button */}
          <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors">
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;