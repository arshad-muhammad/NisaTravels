import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  location?: string;
}

const DEFAULT_KEYWORDS = `travel agency, tour packages, travel agency near me, holiday packages, travel agent, 
international tour packages, Umrah visa services, Umrah travel agency, Umrah packages, 
affordable Umrah visa package, book Umrah visa and flight package India, best travel agency for Umrah visa, 
family-friendly tour packages, luxury honeymoon packages, Dubai holiday packages, 
Islamic tour packages, holy pilgrimage tour packages, cheap holiday packages`;

const DEFAULT_DESCRIPTION = `Leading travel agency offering comprehensive Umrah packages, international tours, and visa services. 
Book affordable holiday packages, Umrah visa services, and luxury travel experiences. Expert travel assistance 
for families and pilgrims with best-in-class service.`;

export const SEO = ({
  title = 'Nisa Travels - Your Trusted Travel & Umrah Visa Agency | Best Travel Packages',
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = '/logo.jpg',
  url = 'https://nisatravels.com',
  type = 'website',
  location = 'India'
}: SEOProps) => {
  const siteUrl = 'https://nisatravels.com';
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;

  // Enhanced structured data for travel agency
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Nisa Travels",
    "description": description,
    "url": canonicalUrl,
    "logo": `${siteUrl}${image}`,
    "image": `${siteUrl}${image}`,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India",
      "addressRegion": location
    },
    "priceRange": "₹₹₹",
    "areaServed": ["India", "UAE", "Saudi Arabia"],
    "serviceType": [
      "Umrah Visa Services",
      "International Tour Packages",
      "Holiday Packages",
      "Travel Planning",
      "Flight Booking",
      "Hotel Reservations"
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/contact`,
        "inLanguage": "en-IN",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Travel Package Reservation"
      }
    }
  };

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language alternatives */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="Nisa Travels" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional meta tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Nisa Travels" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content={location} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}; 