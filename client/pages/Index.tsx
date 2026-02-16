import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <Navigation />

      {/* Decorative background lines */}
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
          <path d="M 80 500 Q 280 400 480 500 T 880 500" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
          <path d="M 120 600 Q 320 500 520 600 T 920 600" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
          <path d="M 200 700 Q 400 600 600 700 T 1000 700" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto pt-20">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            DzakCloud For All
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            With our cloud services, users can enjoy their devices without worrying about storage,
            while maintaining a stable internet and easy access to servers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/pricing")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Buy Now →
            </button>
            <button
              onClick={() => navigate("/services")}
              className="border-2 border-gray-600 hover:border-blue-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors hover:bg-gray-900/30"
            >
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
