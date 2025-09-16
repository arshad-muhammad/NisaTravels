
import { SEO } from "@/components/SEO";
import Hero from "@/components/Hero";
import PopularPackages from "@/components/PopularPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import TravelMoments from "@/components/TravelMoments";
import ExploreByTheme from "@/components/ExploreByTheme";
import UmrahVisa from "@/components/UmrahVisa";
import TrustBadges from "@/components/TrustBadges";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SpecialOffers from "@/components/SpecialOffers";
import InteractiveMap from "@/components/InteractiveMap";
import { FAQ } from "@/components/FAQ";
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // Enhanced structured data for the homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Nisa Travels",
    "description": "Leading travel agency in India offering comprehensive Umrah packages, international tours, and visa services. Expert assistance for family tours and pilgrimages.",
    "url": "https://nisatravels.com",
    "logo": "https://nisatravels.com/logo.jpg",
    "image": [
      "https://nisatravels.com/logo.jpg",
      "https://nisatravels.com/globe.svg",
      "https://nisatravels.com/plane.svg"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India",
      "addressRegion": "Karnataka",
      "addressLocality": "Bengaluru"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9716",
      "longitude": "77.5946"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
    "telephone": "+91 9071147311",
    "priceRange": "₹₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "45000",
      "highPrice": "200000",
      "offerCount": "100"
    }
  };

  return (
    <>
      <SEO 
        title="Nisa Travels - Best Travel & Umrah Visa Agency in India | Holiday Packages"
        description="Book affordable Umrah packages, international tours, and visa services with Nisa Travels. Expert travel agency for family tours, honeymoon packages, and pilgrimages. Best deals on Dubai packages and India tours."
        keywords="travel agency near me, Umrah visa services India, Umrah packages, international tour packages, holiday packages, family tour packages, Dubai packages, Kashmir tours, Goa packages, affordable travel packages"
        location="Bengaluru"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <link rel="preload" href="/logo.jpg" as="image" />
        <link rel="preload" href="/globe.svg" as="image" />
        <link rel="preload" href="/plane.svg" as="image" />
      </Helmet>
      <div className="min-h-screen">
        <Hero />
        <PopularPackages />
        <SpecialOffers />
        <WhyChooseUs />
        <InteractiveMap />
        {/* <ExploreByTheme /> */}
        <UmrahVisa />
        <Testimonials />
        <FAQ />
        <TravelMoments />
        <TrustBadges />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Index;
