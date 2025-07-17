
import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const TravelMoments = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const travelPhotos = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mountain landscape with deer",
      location: "Swiss Alps"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "River between mountains",
      location: "Norway Fjords"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Ocean waves at beach",
      location: "Maldives"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mountain landscape with sunlight",
      location: "Himalayas"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Humpback whale jumping",
      location: "Iceland"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Cattle in forest",
      location: "Amazon Rainforest"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Camels in desert",
      location: "Sahara Desert"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Mountain landscape",
      location: "Patagonia"
    }
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {travelPhotos.map((photo, index) => (
            <Dialog key={photo.id}>
              <DialogTrigger asChild>
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square animate-fadeInUp opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.location}
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 border-0">
                <div className="relative">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <h3 className="text-white text-xl font-semibold">{photo.location}</h3>
                    <p className="text-white/80 text-sm mt-1">Captured by our travelers</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

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
