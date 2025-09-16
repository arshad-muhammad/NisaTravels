
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getTravelMoments } from "@/lib/firebase";
import type { TravelMoment } from "@/lib/firebase";

const TravelMoments = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [moments, setMoments] = useState<TravelMoment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMoments();
  }, []);

  const loadMoments = async () => {
    try {
      setIsLoading(true);
      const data = await getTravelMoments();
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => b.createdAt - a.createdAt);
      setMoments(sortedData);
    } catch (error) {
      console.error('Error loading travel moments:', error);
      // Fallback to mock data if Firebase fails
      setMoments([
        {
          id: "1",
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Mountain landscape with deer",
          location: "Swiss Alps",
          description: "Breathtaking views of the Swiss Alps",
          travelerName: "Sarah M.",
          category: "Mountain",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "2",
          image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "River between mountains",
          location: "Norway Fjords",
          description: "Serene fjords of Norway",
          travelerName: "Michael K.",
          category: "Nature",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "3",
          image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Ocean waves at beach",
          location: "Maldives",
          description: "Crystal clear waters of Maldives",
          travelerName: "Emma L.",
          category: "Beach",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "4",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Mountain landscape with sunlight",
          location: "Himalayas",
          description: "Majestic peaks of the Himalayas",
          travelerName: "David R.",
          category: "Mountain",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "5",
          image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Humpback whale jumping",
          location: "Iceland",
          description: "Whale watching in Iceland",
          travelerName: "Lisa P.",
          category: "Wildlife",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "6",
          image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Cattle in forest",
          location: "Amazon Rainforest",
          description: "Exploring the Amazon Rainforest",
          travelerName: "Carlos M.",
          category: "Nature",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "7",
          image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Camels in desert",
          location: "Sahara Desert",
          description: "Desert adventure in the Sahara",
          travelerName: "Ahmed K.",
          category: "Adventure",
          createdAt: Date.now(),
          isActive: true
        },
        {
          id: "8",
          image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          alt: "Mountain landscape",
          location: "Patagonia",
          description: "Hiking in Patagonia",
          travelerName: "Maria S.",
          category: "Adventure",
          createdAt: Date.now(),
          isActive: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Travel Moments
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Authentic experiences shared by our travelers from around the world
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600">Loading travel moments...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            {moments.map((moment, index) => (
              <Dialog key={moment.id}>
                <DialogTrigger asChild>
                  <div 
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square animate-fadeInUp opacity-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={moment.image}
                      alt={moment.alt}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {moment.location}
                        {moment.travelerName && (
                          <div className="text-xs opacity-80">by {moment.travelerName}</div>
                        )}
                      </div>
                    </div>
                    {moment.category && (
                      <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {moment.category}
                      </div>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0 border-0">
                  <div className="relative">
                    <img
                      src={moment.image}
                      alt={moment.alt}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold">{moment.location}</h3>
                      {moment.travelerName && (
                        <p className="text-white/80 text-sm mt-1">Captured by {moment.travelerName}</p>
                      )}
                      {moment.description && (
                        <p className="text-white/90 text-sm mt-2">{moment.description}</p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Share your travel moments with us using 
            <span className="text-primary font-semibold"> #ExploreWithUs</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TravelMoments;
