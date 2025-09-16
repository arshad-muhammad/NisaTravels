import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface SearchParams {
  destination: string;
  date: string;
  travelers: number;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  highlights: string[];
  image: string;
  rating: number;
  availableSeats: number;
}

const samplePackages = [
  {
    id: "dubai-city-1",
    title: "Dubai City Explorer",
    description: "Experience the perfect blend of modern luxury and traditional culture in Dubai.",
    price: 1499,
    duration: "5 Days",
    highlights: ["Burj Khalifa Visit", "Desert Safari", "Dubai Mall", "Dhow Cruise"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    availableSeats: 12
  },
  {
    id: "dubai-luxury-1",
    title: "Dubai Luxury Escape",
    description: "Indulge in a luxurious Dubai experience with premium accommodations and exclusive activities.",
    price: 2499,
    duration: "7 Days",
    highlights: ["Palm Jumeirah Tour", "Helicopter Ride", "Desert Resort Stay", "Private Beach Access"],
    image: "https://images.unsplash.com/photo-1533395427226-788cee25cc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    availableSeats: 8
  },
  {
    id: "dubai-adventure-1",
    title: "Dubai Adventure Package",
    description: "Get your adrenaline pumping with exciting activities in and around Dubai.",
    price: 1799,
    duration: "6 Days",
    highlights: ["Skydiving", "Desert Quad Biking", "Water Park", "Zip Line"],
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    availableSeats: 15
  }
];

export async function searchTrips(params: SearchParams): Promise<SearchResult[]> {
  try {
    console.log("Searching with params:", params);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a travel package search API for Nisa Travels UAE. Generate 3 detailed, realistic travel packages for:
      Destination: ${params.destination}
      Travel Date: ${params.date}
      Number of Travelers: ${params.travelers}

      Requirements:
      1. Focus on UAE destinations and attractions
      2. Consider seasonal weather and events
      3. Adjust for group size
      4. Include local cultural experiences
      5. Provide realistic pricing

      Response must be ONLY a JSON array with exactly 3 packages. Each package must follow this EXACT format:
      {
        "id": "unique-string-id",
        "title": "Package Name",
        "description": "2-3 sentence description",
        "price": 1234,
        "duration": "X Days",
        "highlights": ["4 main attractions"],
        "image": "https://images.unsplash.com/relevant-image",
        "rating": 4.8,
        "availableSeats": 10
      }

      Do not include any other text, only the JSON array.
    `;

    console.log("Sending prompt to Gemini...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Raw Gemini response:", text);
    
    try {
      // First try to parse the entire response as JSON
      const parsedResults = JSON.parse(text);
      console.log("Successfully parsed results:", parsedResults);
      return parsedResults;
    } catch (parseError) {
      console.log("Failed to parse entire response, trying to extract JSON...");
      // If that fails, try to extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        console.log("No JSON found in response, using fallback packages");
        // If no valid JSON is found, return sample packages
        return samplePackages.map(pkg => ({
          ...pkg,
          price: pkg.price * params.travelers // Adjust price for number of travelers
        }));
      }
      
      const extractedJson = JSON.parse(jsonMatch[0]);
      console.log("Successfully extracted and parsed JSON:", extractedJson);
      return extractedJson;
    }
  } catch (error) {
    console.error("Error in searchTrips:", error);
    // Return sample packages as fallback
    return samplePackages.map(pkg => ({
      ...pkg,
      price: pkg.price * params.travelers // Adjust price for number of travelers
    }));
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
} 