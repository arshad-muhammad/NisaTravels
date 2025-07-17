
import Hero from "@/components/Hero";
import PopularPackages from "@/components/PopularPackages";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ExploreByTheme from "@/components/ExploreByTheme";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularPackages />
      <WhyChooseUs />
      <Testimonials />
      <ExploreByTheme />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
