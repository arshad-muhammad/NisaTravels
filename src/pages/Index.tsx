
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularPackages />
      <WhyChooseUs />
      <Testimonials />
      <TravelMoments />
      <ExploreByTheme />
      <UmrahVisa />
      <TrustBadges />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
