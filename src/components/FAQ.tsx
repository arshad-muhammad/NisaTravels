import { Helmet } from 'react-helmet-async';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How to apply for Umrah visa from India?",
    answer: "Applying for an Umrah visa from India involves submitting your passport, photos, vaccination records, and other required documents. Our expert team handles the entire process, making it hassle-free for you. Contact us for detailed requirements and assistance."
  },
  {
    question: "What documents are needed for Umrah visa?",
    answer: "Required documents include: valid passport with 6 months validity, passport-size photos, vaccination certificates, completed visa application form, and proof of accommodation in Saudi Arabia. Our team will guide you through the documentation process."
  },
  {
    question: "How much does an Umrah package cost from India?",
    answer: "Umrah package costs vary based on your choice of accommodation, travel dates, and duration. Our packages start from ₹45,000 and include visa, flights, hotel stays, and ground transportation. Contact us for a customized quote."
  },
  {
    question: "Do you offer family-friendly tour packages in India?",
    answer: "Yes, we specialize in family-friendly tour packages across India and internationally. Our packages include child-friendly accommodations, activities suitable for all ages, and flexible itineraries to ensure a comfortable journey for the whole family."
  },
  {
    question: "What are the best holiday destinations from India?",
    answer: "Popular destinations include Dubai, Singapore, Malaysia, Thailand, and Maldives for international travel. Within India, we offer packages to Kashmir, Kerala, Goa, and other scenic locations. Each destination offers unique experiences and we can help you choose based on your preferences."
  },
  {
    question: "How to book cheap holiday packages from India to Dubai?",
    answer: "To get the best deals on Dubai packages, book during off-peak seasons, look for our early bird discounts, and consider our special promotional offers. We also provide customized packages to fit your budget while ensuring quality service."
  }
];

export const FAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}; 