
import { Shield, RefreshCw, Building, CheckCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const TrustBadges = () => {
  const badges = [
    {
      icon: RefreshCw,
      title: "100% Refundable",
      description: "Full refund guaranteed if you cancel within 24 hours of booking",
      color: "text-green-500"
    },
    {
      icon: Building,
      title: "Govt. Registered",
      description: "Licensed and registered travel company with all necessary certifications",
      color: "text-primary"
    },
    {
      icon: CheckCircle,
      title: "Verified Hotels",
      description: "All accommodations are personally verified for quality and safety standards",
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Bank-level encryption and secure payment processing for all transactions",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-16 bg-card border-t border-b">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trust & Safety</h2>
          <p className="text-muted-foreground">Your security and satisfaction are our top priorities</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {badges.map((badge, index) => (
            <HoverCard key={badge.title}>
              <HoverCardTrigger asChild>
                <div 
                  className="flex flex-col items-center text-center p-6 rounded-xl border bg-background hover:shadow-lg transition-all duration-300 cursor-pointer group hover-glow animate-scaleIn opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-3 rounded-full bg-background border-2 mb-4 group-hover:scale-110 transition-transform duration-300 ${badge.color}`}>
                    <badge.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{badge.title}</h3>
                  <div className="w-8 h-0.5 bg-primary/30 group-hover:bg-primary transition-colors duration-300"></div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex space-x-4">
                  <div className={`p-2 rounded-full ${badge.color} bg-muted`}>
                    <badge.icon className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{badge.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {badge.description}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Trusted by over 5,000+ happy travelers worldwide</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
