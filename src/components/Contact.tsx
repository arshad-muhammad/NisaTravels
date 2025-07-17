
import { useState } from "react";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    travelInterest: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      travelInterest: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get in <span className="text-orange-300">Touch</span>
          </h2>
          <p className="text-xl text-white opacity-90 max-w-2xl mx-auto">
            Ready to start your next adventure? Contact us and let's plan your perfect getaway
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="glass-effect border-white border-opacity-20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder:text-white placeholder:opacity-70"
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder:text-white placeholder:opacity-70"
                    required
                  />
                </div>
                
                <Input
                  name="travelInterest"
                  placeholder="Travel Interest (e.g., Adventure, Beach, Cultural)"
                  value={formData.travelInterest}
                  onChange={handleChange}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder:text-white placeholder:opacity-70"
                />
                
                <Textarea
                  name="message"
                  placeholder="Tell us about your dream trip..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="bg-white bg-opacity-10 border-white border-opacity-20 text-white placeholder:text-white placeholder:opacity-70"
                  required
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg rounded-full hover-glow"
                >
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="grid gap-6">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Our Office</h3>
                  <p className="opacity-80">123 Travel Street, Adventure City, AC 12345</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="opacity-80">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="opacity-80">hello@travelwithus.com</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 rounded-xl overflow-hidden glass-effect">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <MapPin className="h-16 w-16 mx-auto mb-4 animate-bounce-slow" />
                  <p className="text-lg font-semibold">Find Us Here</p>
                  <p className="opacity-80">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
