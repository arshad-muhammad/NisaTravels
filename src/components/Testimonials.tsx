
import { Star, Quote, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Business Traveler",
    image: "https://i.pravatar.cc/150?img=1",
    content: "Nisa Travels made my business trip to Dubai absolutely seamless. Their attention to detail and professional service exceeded my expectations.",
    rating: 5,
    location: "Dubai, UAE"
  },
  {
    id: 2,
    name: "Mohammed Hassan",
    role: "Family Vacation",
    image: "https://i.pravatar.cc/150?img=2",
    content: "Our family vacation was perfectly planned by Nisa Travels. From flights to activities, everything was well-organized and kid-friendly.",
    rating: 5,
    location: "Abu Dhabi, UAE"
  },
  {
    id: 3,
    name: "Fatima Al-Sayed",
    role: "Honeymoon Trip",
    image: "https://i.pravatar.cc/150?img=3",
    content: "Thank you Nisa Travels for making our honeymoon magical! The private tours and luxury accommodations were exactly what we dreamed of.",
    rating: 5,
    location: "Sharjah, UAE"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
              What Our Travelers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from our valued customers who have explored the world with Nisa Travels.
            </p>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-100 transform -scale-x-100" />
                <p className="text-gray-600 leading-relaxed pl-4">
                  {testimonial.content}
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="p-6 rounded-2xl bg-white shadow-lg">
            <div className="text-4xl font-bold text-primary">98%</div>
            <div className="mt-2 text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-lg">
            <div className="text-4xl font-bold text-primary">10K+</div>
            <div className="mt-2 text-gray-600">Happy Travelers</div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-lg">
            <div className="text-4xl font-bold text-primary">150+</div>
            <div className="mt-2 text-gray-600">Destinations</div>
          </div>
          <div className="p-6 rounded-2xl bg-white shadow-lg">
            <div className="text-4xl font-bold text-primary">12+</div>
            <div className="mt-2 text-gray-600">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
