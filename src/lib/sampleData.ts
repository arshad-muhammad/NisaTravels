import { addPackage, addOffer } from './firebase';

export const addSampleData = async () => {
  try {
    console.log('Adding sample data to Firebase...');

    // Add sample packages
    const samplePackages = [
      {
        title: "Dubai Luxury Experience",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "5 Days",
        highlights: ["5-star hotel", "Desert Safari", "Burj Khalifa Visit", "Dhow Cruise"],
        rating: 4.9,
        price: "$1,299",
        location: "Dubai, UAE",
        description: "Experience luxury and adventure in the heart of Dubai",
        groupSize: "2-4 People"
      },
      {
        title: "Abu Dhabi Cultural Tour",
        image: "https://images.unsplash.com/photo-1511700581673-4c78fa0cbec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        duration: "4 Days",
        highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Louvre Abu Dhabi", "Desert Adventure"],
        rating: 4.8,
        price: "$1,199",
        location: "Abu Dhabi, UAE",
        description: "Discover the cultural heritage and modern marvels of Abu Dhabi",
        groupSize: "2-6 People"
      }
    ];

    // Add sample offers
    const sampleOffers = [
      {
        title: "Dubai City Break",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Experience luxury and adventure in the heart of Dubai",
        originalPrice: 1999,
        discountedPrice: 1499,
        discount: 25,
        duration: "5 Days",
        groupSize: "2-4 People",
        validUntil: "2024-12-31",
        highlights: ["5-star hotel", "Desert Safari", "Burj Khalifa Visit", "Dhow Cruise"]
      },
      {
        title: "Abu Dhabi Explorer",
        image: "https://images.unsplash.com/photo-1511700581673-4c78fa0cbec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Discover the cultural heritage and modern marvels of Abu Dhabi",
        originalPrice: 1799,
        discountedPrice: 1399,
        discount: 22,
        duration: "4 Days",
        groupSize: "2-6 People",
        validUntil: "2024-12-31",
        highlights: ["Sheikh Zayed Mosque", "Ferrari World", "Louvre Abu Dhabi", "Desert Adventure"]
      }
    ];

    // Add packages
    for (const pkg of samplePackages) {
      await addPackage(pkg);
      console.log('Added package:', pkg.title);
    }

    // Add offers
    for (const offer of sampleOffers) {
      await addOffer(offer);
      console.log('Added offer:', offer.title);
    }

    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}; 