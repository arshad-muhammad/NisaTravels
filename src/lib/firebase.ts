import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, get, child, remove, update } from 'firebase/database';

// TypeScript interfaces
export interface BookingData {
  destination: string;
  date: string;
  travelers: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  specialRequests?: string;
}

export interface Booking extends BookingData {
  id: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PackageData {
  title: string;
  image: string;
  duration: string;
  highlights: string[];
  rating: number;
  price: string;
  location: string;
  description?: string;
  groupSize?: string;
}

export interface Package extends PackageData {
  id: string;
  createdAt: number;
}

export interface OfferData {
  title: string;
  image: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  duration: string;
  groupSize: string;
  validUntil: string;
  highlights: string[];
}

export interface Offer extends OfferData {
  id: string;
  createdAt: number;
}

export interface UmrahApplicationData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  passportNumber: string;
  passportExpiry: string;
  travelDate: string;
  numberOfTravelers: string;
  purpose: string;
  additionalNotes: string;
}

export interface UmrahApplication extends UmrahApplicationData {
  id: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TravelMomentData {
  image: string;
  alt: string;
  location: string;
  description?: string;
  travelerName?: string;
  category?: string;
}

export interface TravelMoment extends TravelMomentData {
  id: string;
  createdAt: number;
  isActive: boolean;
}

const firebaseConfig = {
    apiKey: "AIzaSyCj-f7fuiXzFfNLxlHw1F2fPQTLyNvMIbk",
    authDomain: "nisa-travels.firebaseapp.com",
    databaseURL: "https://nisa-travels-default-rtdb.firebaseio.com",
    projectId: "nisa-travels",
    storageBucket: "nisa-travels.firebasestorage.app",
    messagingSenderId: "45566547418",
    appId: "1:45566547418:web:d190aa24a9e26e2be39ce3",
    measurementId: "G-JGTK5L0QXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Database references
export const dbRef = ref(database);

// Booking submissions
export const submitBooking = async (bookingData: BookingData) => {
  try {
    const newBookingRef = push(ref(database, 'bookings'));
    await set(newBookingRef, {
      ...bookingData,
      id: newBookingRef.key,
      timestamp: Date.now(),
      status: 'pending'
    });
    return newBookingRef.key;
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw error;
  }
};

export const getBookings = async (): Promise<Booking[]> => {
  try {
    const snapshot = await get(child(dbRef, 'bookings'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  } catch (error) {
    console.error('Error getting bookings:', error);
    throw error;
  }
};

export const updateBooking = async (id: string, bookingData: Partial<Booking>) => {
  try {
    await update(ref(database, `bookings/${id}`), bookingData);
  } catch (error) {
    console.error('Error updating booking:', error);
    throw error;
  }
};

// Popular packages
export const addPackage = async (packageData: PackageData) => {
  try {
    const newPackageRef = push(ref(database, 'packages'));
    await set(newPackageRef, {
      ...packageData,
      id: newPackageRef.key,
      createdAt: Date.now()
    });
    return newPackageRef.key;
  } catch (error) {
    console.error('Error adding package:', error);
    throw error;
  }
};

export const getPackages = async (): Promise<Package[]> => {
  try {
    console.log('Fetching packages from Firebase...');
    const snapshot = await get(child(dbRef, 'packages'));
    console.log('Firebase snapshot:', snapshot.val());
    if (snapshot.exists()) {
      const packages = Object.values(snapshot.val()) as Package[];
      console.log('Packages found:', packages);
      return packages;
    }
    console.log('No packages found in Firebase');
    return [];
  } catch (error) {
    console.error('Error getting packages:', error);
    throw error;
  }
};

export const updatePackage = async (id: string, packageData: Partial<PackageData>) => {
  try {
    await update(ref(database, `packages/${id}`), packageData);
  } catch (error) {
    console.error('Error updating package:', error);
    throw error;
  }
};

export const deletePackage = async (id: string) => {
  try {
    await remove(ref(database, `packages/${id}`));
  } catch (error) {
    console.error('Error deleting package:', error);
    throw error;
  }
};

// Special offers
export const addOffer = async (offerData: OfferData) => {
  try {
    const newOfferRef = push(ref(database, 'offers'));
    await set(newOfferRef, {
      ...offerData,
      id: newOfferRef.key,
      createdAt: Date.now()
    });
    return newOfferRef.key;
  } catch (error) {
    console.error('Error adding offer:', error);
    throw error;
  }
};

export const getOffers = async (): Promise<Offer[]> => {
  try {
    console.log('Fetching offers from Firebase...');
    const snapshot = await get(child(dbRef, 'offers'));
    console.log('Firebase snapshot:', snapshot.val());
    if (snapshot.exists()) {
      const offers = Object.values(snapshot.val()) as Offer[];
      console.log('Offers found:', offers);
      return offers;
    }
    console.log('No offers found in Firebase');
    return [];
  } catch (error) {
    console.error('Error getting offers:', error);
    throw error;
  }
};

export const updateOffer = async (id: string, offerData: Partial<OfferData>) => {
  try {
    await update(ref(database, `offers/${id}`), offerData);
  } catch (error) {
    console.error('Error updating offer:', error);
    throw error;
  }
};

export const deleteOffer = async (id: string) => {
  try {
    await remove(ref(database, `offers/${id}`));
  } catch (error) {
    console.error('Error deleting offer:', error);
    throw error;
  }
};

// Umrah Applications
export const submitUmrahApplication = async (applicationData: UmrahApplicationData) => {
  try {
    const newApplicationRef = push(ref(database, 'umrahApplications'));
    await set(newApplicationRef, {
      ...applicationData,
      id: newApplicationRef.key,
      timestamp: Date.now(),
      status: 'pending'
    });
    return newApplicationRef.key;
  } catch (error) {
    console.error('Error submitting Umrah application:', error);
    throw error;
  }
};

export const getUmrahApplications = async (): Promise<UmrahApplication[]> => {
  try {
    const snapshot = await get(child(dbRef, 'umrahApplications'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as UmrahApplication[];
    }
    return [];
  } catch (error) {
    console.error('Error getting Umrah applications:', error);
    throw error;
  }
};

export const updateUmrahApplication = async (id: string, applicationData: Partial<UmrahApplication>) => {
  try {
    await update(ref(database, `umrahApplications/${id}`), applicationData);
  } catch (error) {
    console.error('Error updating Umrah application:', error);
    throw error;
  }
};

// Travel Moments
export const addTravelMoment = async (momentData: TravelMomentData) => {
  try {
    const newMomentRef = push(ref(database, 'travelMoments'));
    await set(newMomentRef, {
      ...momentData,
      id: newMomentRef.key,
      createdAt: Date.now(),
      isActive: true
    });
    return newMomentRef.key;
  } catch (error) {
    console.error('Error adding travel moment:', error);
    throw error;
  }
};

export const getTravelMoments = async (): Promise<TravelMoment[]> => {
  try {
    const snapshot = await get(child(dbRef, 'travelMoments'));
    if (snapshot.exists()) {
      return Object.values(snapshot.val()) as TravelMoment[];
    }
    return [];
  } catch (error) {
    console.error('Error getting travel moments:', error);
    throw error;
  }
};

export const updateTravelMoment = async (id: string, momentData: Partial<TravelMoment>) => {
  try {
    await update(ref(database, `travelMoments/${id}`), momentData);
  } catch (error) {
    console.error('Error updating travel moment:', error);
    throw error;
  }
};

export const deleteTravelMoment = async (id: string) => {
  try {
    await remove(ref(database, `travelMoments/${id}`));
  } catch (error) {
    console.error('Error deleting travel moment:', error);
    throw error;
  }
};

export { database }; 