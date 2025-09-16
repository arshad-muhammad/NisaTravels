import { motion } from "framer-motion";
import { Calendar, Users, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getOffers } from "@/lib/firebase";
import type { Offer } from "@/lib/firebase";

const offers = [
  {
    id: 1,
    title: "Dubai City Break",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience luxury and adventure in the heart of Dubai",
    originalPrice: 1999,
    discountedPrice: 1499,
    discount: 25,
    duration: "5 Days",
    groupSize: "2-4 People",
    validUntil: "2024-05-30",
    highlights: ["5-star hotel", "Desert Safari", "Burj Khalifa Visit", "Dhow Cruise"]
  },
  {
    id: 2,
    title: "Abu Dhabi Explorer",
    image: "https://images.unsplash.com/photo-1511700581673-4c78fa0cbec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Discover the cultural heritage and modern marvels of Abu Dhabi",
    originalPrice: 1799,
    discountedPrice: 1399,
    discount: 22,
    duration: "4 Days",
    groupSize: "2-6 People",
    validUntil: "2024-06-15",
    highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Louvre Abu Dhabi", "Desert Adventure"]
  },
  {
    id: 3,
    title: "Ras Al Khaimah Getaway",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Relax and unwind in the northernmost emirate",
    originalPrice: 1599,
    discountedPrice: 1199,
    discount: 25,
    duration: "3 Days",
    groupSize: "2-4 People",
    validUntil: "2024-06-30",
    highlights: ["Beach Resort", "Mountain Adventure", "Water Sports", "Desert Camp"]
  }
];

const SpecialOffers = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setIsLoading(true);
      console.log('Loading offers from Firebase...');
      const data = await getOffers();
      console.log('Offers loaded:', data);
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setOffers(sortedData);
    } catch (error) {
      console.error('Error loading offers:', error);
      // Fallback to mock data if Firebase fails
      setOffers([
        {
          id: "1",
          title: "Dubai City Break",
          image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Experience luxury and adventure in the heart of Dubai",
          originalPrice: 1999,
          discountedPrice: 1499,
          discount: 25,
          duration: "5 Days",
          groupSize: "2-4 People",
          validUntil: "2024-05-30",
          highlights: ["5-star hotel", "Desert Safari", "Burj Khalifa Visit", "Dhow Cruise"],
          createdAt: Date.now()
        },
        {
          id: "2",
          title: "Abu Dhabi Explorer",
          image: "https://images.unsplash.com/photo-1511700581673-4c78fa0cbec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Discover the cultural heritage and modern marvels of Abu Dhabi",
          originalPrice: 1799,
          discountedPrice: 1399,
          discount: 22,
          duration: "4 Days",
          groupSize: "2-6 People",
          validUntil: "2024-06-15",
          highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Louvre Abu Dhabi", "Desert Adventure"],
          createdAt: Date.now()
        },
        {
          id: "3",
          title: "Ras Al Khaimah Getaway",
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Relax and unwind in the northernmost emirate",
          originalPrice: 1599,
          discountedPrice: 1199,
          discount: 25,
          duration: "3 Days",
          groupSize: "2-4 People",
          validUntil: "2024-06-30",
          highlights: ["Beach Resort", "Mountain Adventure", "Water Sports", "Desert Camp"],
          createdAt: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="special-offers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-4">
            Limited Time Offers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Special Travel Deals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exclusive packages with amazing discounts. Book now and save big on your next adventure!
          </p>
        </motion.div>

        {/* Offers Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">Loading offers...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image and Discount Badge */}
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {offer.discount}% OFF
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">
                    ${offer.discountedPrice}
                  </span>
                  <span className="text-gray-400 line-through">${offer.originalPrice}</span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{offer.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{offer.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-gray-900">Highlights:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {offer.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Button className="w-full bg-primary hover:bg-primary-600 text-white flex items-center justify-center gap-2">
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Don't miss out on these amazing deals. Book your dream vacation today!
          </p>
          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            View All Offers
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers; 