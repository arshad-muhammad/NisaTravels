
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img src="/logo.jpg" alt="Nisa Travels" className="h-12 w-auto mr-2 rounded-full" />
              <h2 className="text-2xl font-bold">
                Nisa<span className="text-primary">Travels</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted partner for unforgettable journeys. Making travel dreams come true since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Destinations</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Tour Packages</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Travel Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">123 Travel Street, Dubai, UAE</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">+971 50 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-gray-400">info@nisatravels.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-primary"
              />
              <Button className="w-full bg-primary hover:bg-primary-600 text-white rounded-lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nisa Travels. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
