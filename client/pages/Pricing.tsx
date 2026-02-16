import Navigation from "@/components/Navigation";
import PricingCard from "@/components/PricingCard";

const PRICING_PACKAGES = [
  {
    title: "Virtual Server",
    price: 50000,
    description: "Perfect for getting started",
    features: [
      "1 vCPU",
      "2GB RAM",
      "50GB Storage",
      "1TB Bandwidth",
      "24/7 Support",
    ],
  },
  {
    title: "Virtual Server",
    price: 50000,
    description: "Most popular choice",
    features: [
      "4 vCPU",
      "8GB RAM",
      "200GB Storage",
      "5TB Bandwidth",
      "Priority Support",
      "Auto Scaling",
    ],
    featured: true,
  },
  {
    title: "Virtual Server",
    price: 50000,
    description: "For large operations",
    features: [
      "16 vCPU",
      "32GB RAM",
      "1TB Storage",
      "Unlimited Bandwidth",
      "Dedicated Support",
      "Custom Configuration",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <Navigation />

      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-full h-full opacity-20"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5b5fff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#5b5fff" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M 100 200 Q 300 100 500 200 T 900 200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
          <path d="M 50 300 Q 250 200 450 300 T 850 300" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
          <path d="M 150 400 Q 350 300 550 400 T 950 400" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your cloud infrastructure needs.
              All plans include 99.9% uptime guarantee and 24/7 customer support.
            </p>
          </div>

          {/* Pricing Cards Grid - 3 Cards with Center Featured */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PRICING_PACKAGES.map((pkg, index) => (
              <PricingCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                description={pkg.description}
                features={pkg.features}
                featured={pkg.featured}
                showFreeTrialButton={pkg.featured}
              />
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Can I upgrade my plan anytime?
                </h3>
                <p className="text-gray-400">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments.
                </p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Is there a money-back guarantee?
                </h3>
                <p className="text-gray-400">
                  We offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your payment in full.
                </p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Are there any hidden fees?
                </h3>
                <p className="text-gray-400">
                  No hidden fees. The price you see is what you pay. Additional services like backups or extra storage are clearly listed.
                </p>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you offer enterprise plans?
                </h3>
                <p className="text-gray-400">
                  Yes! For custom requirements, contact our sales team. We can create tailored solutions for enterprise clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
