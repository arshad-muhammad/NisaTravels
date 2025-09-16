
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="relative p-5 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="relative bg-gradient-to-br from-primary-700 via-primary-700 to-primary-900 rounded-lg max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have questions about our services? We're here to help you plan your perfect journey.
          </p>
        </motion.div>

        <div className="grid place-items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20 w-full max-w-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    First Name
                  </label>
                  <Input 
                    type="text"
                    className="w-full bg-white/5 border-white/10 focus:border-primary/40 focus:ring-primary/30 rounded-lg text-white placeholder:text-white/50"
                    placeholder="John"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Last Name
                  </label>
                  <Input 
                    type="text"
                    className="w-full bg-white/5 border-white/10 focus:border-primary/40 focus:ring-primary/30 rounded-lg text-white placeholder:text-white/50"
                    placeholder="Doe"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <Input 
                  type="email"
                  className="w-full bg-white/5 border-white/10 focus:border-primary/40 focus:ring-primary/30 rounded-lg text-white placeholder:text-white/50"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-white/90 mb-2">
                  Message
                </label>
                <Textarea 
                  className="w-full bg-white/5 border-white/10 focus:border-primary/40 focus:ring-primary/30 rounded-lg text-white placeholder:text-white/50 min-h-[150px]"
                  placeholder="How can we help you?"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Button 
                  type="submit"
                  className="bg-white hover:bg-white/90 text-primary font-semibold px-8 py-2 rounded-lg transition-colors duration-300 min-w-[200px]"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
