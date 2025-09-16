import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > heroBottom - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero-section", active: true },
    { name: "Popular Packages", href: "#popular-packages", active: false },
    { name: "Special Offers", href: "#special-offers", active: false },
    { name: "Explore Themes", href: "#explore-themes", active: false },
    { name: "Umrah Visa", href: "#umrah-visa", active: false },
    { name: "Contact", href: "#contact", active: false },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of the fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
    setIsNavVisible(false);
  };

  return (
    <>
      {/* Fixed center button that appears when scrolled */}
      <AnimatePresence>
        {isScrolled && !isNavVisible && (
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg hover:shadow-xl transition-all w-10 h-10 p-0"
              onClick={() => setIsNavVisible(!isNavVisible)}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation */}
      <AnimatePresence>
        {(!isScrolled || isNavVisible) && (
          <motion.nav 
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
        className="bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
                    className="flex items-center cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
                    onClick={() => handleNavClick("#hero-section")}
            >
                    <img src="/logo.jpg" alt="Nisa Travels" className="h-12 w-auto mr-2 rounded-full" />
              <h1 className="text-2xl font-bold">
                Nisa<span className="text-primary">Travels</span>
              </h1>
            </motion.div>

                  {/* Close button when nav is shown via menu */}
                  {isScrolled && isNavVisible && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsNavVisible(false)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  )}

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                      <motion.button
                  key={link.name}
                        onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    link.active 
                      ? 'text-primary bg-primary-50' 
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                      </motion.button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
            <Button
  variant="outline"
  className="rounded-full"
  onClick={() => window.open("https://wa.me/919071147311", "_blank")}
>
  +91 9071147311
</Button>

            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="relative z-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
            </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden absolute top-20 inset-x-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-lg"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                      <button
                    key={link.name}
                        onClick={() => handleNavClick(link.href)}
                        className={`block w-full px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      link.active 
                        ? 'text-primary bg-primary-50' 
                        : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                      </button>
                ))}
                    <div className="space-y-2 pt-4 border-t border-gray-100">
                      <Button variant="outline" className="w-full rounded-full">
                    Sign In
                  </Button>
                      <Button className="w-full bg-primary text-white rounded-full hover:bg-primary-600 transition-colors">
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;