import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ServiceCard from "@/components/ServiceCard";
import { ChevronDown, Cloud, Database, Lock, Zap, BarChart3, Headphones, Server, GitBranch, Mail, Code, Shield } from "lucide-react";

// WhatsApp number - update this with actual company number
const WHATSAPP_NUMBER = "628123456789";

interface Service {
  id: string;
  category: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price?: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

const CATEGORIES: ServiceCategory[] = [
  { id: "hosting", name: "Cloud Hosting", description: "Infrastructure & Hosting Solutions" },
  { id: "storage", name: "Storage", description: "Data Storage & Backup Services" },
  { id: "security", name: "Security", description: "Security & Protection" },
  { id: "support", name: "Support", description: "Professional Support Services" },
];

const SERVICES: Service[] = [
  // Cloud Hosting
  {
    id: "vps-lite",
    category: "hosting",
    icon: <Server className="w-8 h-8" />,
    title: "VPS Lite",
    description: "Perfect for small projects and startups",
    features: ["2 vCPU Cores", "2GB RAM", "50GB SSD Storage", "Unlimited Bandwidth", "Free SSL Certificate"],
    price: "Mulai dari Rp 99,000/bulan",
  },
  {
    id: "vps-standard",
    category: "hosting",
    icon: <Server className="w-8 h-8" />,
    title: "VPS Standard",
    description: "Ideal for growing businesses",
    features: ["4 vCPU Cores", "8GB RAM", "120GB SSD Storage", "Unlimited Bandwidth", "Free SSL & Backups"],
    price: "Mulai dari Rp 299,000/bulan",
  },
  {
    id: "vps-pro",
    category: "hosting",
    icon: <Server className="w-8 h-8" />,
    title: "VPS Pro",
    description: "Enterprise-grade performance",
    features: ["8 vCPU Cores", "16GB RAM", "250GB SSD Storage", "Unlimited Bandwidth", "Priority Support"],
    price: "Mulai dari Rp 799,000/bulan",
  },
  {
    id: "cloud-web",
    category: "hosting",
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud Web Hosting",
    description: "Managed web hosting with automatic scaling",
    features: ["Auto-scaling Infrastructure", "CDN Global", "Daily Backups", "99.9% Uptime", "Free Migration"],
    price: "Mulai dari Rp 149,000/bulan",
  },

  // Storage
  {
    id: "cloud-storage",
    category: "storage",
    icon: <Database className="w-8 h-8" />,
    title: "Cloud Storage",
    description: "Secure cloud storage for your files",
    features: ["End-to-End Encryption", "100GB Free Storage", "File Sharing & Collaboration", "Version Control", "Mobile App Access"],
    price: "Free - Rp 299,000/bulan",
  },
  {
    id: "backup-pro",
    category: "storage",
    icon: <Database className="w-8 h-8" />,
    title: "Backup Pro",
    description: "Automated backup solutions",
    features: ["Automatic Daily Backups", "Multiple Backup Locations", "Instant Recovery", "Incremental Backups", "Unlimited Restore"],
    price: "Mulai dari Rp 199,000/bulan",
  },
  {
    id: "cdn-service",
    category: "storage",
    icon: <Zap className="w-8 h-8" />,
    title: "CDN Global",
    description: "Lightning-fast content delivery",
    features: ["150+ POP Locations", "DDoS Protection", "Bandwidth Optimization", "Real-time Analytics", "Cache Management"],
    price: "Mulai dari Rp 249,000/bulan",
  },
  {
    id: "database-hosting",
    category: "storage",
    icon: <Database className="w-8 h-8" />,
    title: "Database Hosting",
    description: "Managed database solutions",
    features: ["MySQL, PostgreSQL & MongoDB", "Automatic Backups", "High Availability", "Monitoring & Alerts", "Free Migration"],
    price: "Mulai dari Rp 179,000/bulan",
  },

  // Security
  {
    id: "ssl-certificate",
    category: "security",
    icon: <Lock className="w-8 h-8" />,
    title: "SSL Certificate",
    description: "Secure your website with SSL",
    features: ["Domain Validation", "Wildcard Certificates", "Multi-year Discounts", "Auto-renewal", "24/7 Support"],
    price: "Mulai dari Rp 49,000/tahun",
  },
  {
    id: "ddos-protection",
    category: "security",
    icon: <Shield className="w-8 h-8" />,
    title: "DDoS Protection",
    description: "Advanced DDoS mitigation",
    features: ["24/7 Monitoring", "Automatic Mitigation", "IP Reputation Filtering", "Custom Rules", "Attack Reports"],
    price: "Mulai dari Rp 499,000/bulan",
  },
  {
    id: "firewall-managed",
    category: "security",
    icon: <Shield className="w-8 h-8" />,
    title: "Managed Firewall",
    description: "Enterprise firewall protection",
    features: ["IDS/IPS Protection", "Threat Intelligence", "Real-time Blocking", "Logging & Reporting", "Geo-blocking"],
    price: "Mulai dari Rp 349,000/bulan",
  },
  {
    id: "security-audit",
    category: "security",
    icon: <Lock className="w-8 h-8" />,
    title: "Security Audit",
    description: "Comprehensive security assessment",
    features: ["Vulnerability Scanning", "Penetration Testing", "Detailed Reports", "Remediation Guidance", "Follow-up Audit"],
    price: "Mulai dari Rp 2,999,000 (one-time)",
  },

  // Support
  {
    id: "basic-support",
    category: "support",
    icon: <Headphones className="w-8 h-8" />,
    title: "Basic Support",
    description: "Standard email support",
    features: ["Email Support", "12-hour Response Time", "Knowledge Base Access", "Community Forum", "Business Hours Support"],
    price: "Included / Free",
  },
  {
    id: "premium-support",
    category: "support",
    icon: <Headphones className="w-8 h-8" />,
    title: "Premium Support",
    description: "Priority support with guaranteed response",
    features: ["24/7 Phone Support", "1-hour Response Time", "Dedicated Support Team", "Priority Queue", "Live Chat"],
    price: "Mulai dari Rp 199,000/bulan",
  },
  {
    id: "enterprise-support",
    category: "support",
    icon: <Headphones className="w-8 h-8" />,
    title: "Enterprise Support",
    description: "Premium dedicated support team",
    features: ["Dedicated Account Manager", "15-minute Response Time", "SLA Guarantee", "Custom Solutions", "Monthly Reviews"],
    price: "Custom Pricing",
  },
  {
    id: "managed-services",
    category: "support",
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Managed Services",
    description: "Full infrastructure management",
    features: ["24/7 Monitoring", "Proactive Maintenance", "Performance Optimization", "Security Updates", "Monthly Reports"],
    price: "Mulai dari Rp 999,000/bulan",
  },
];

const FAQ = [
  {
    question: "Bagaimana cara memulai dengan DzakCloud?",
    answer: "Daftar akun gratis, pilih layanan yang sesuai kebutuhan Anda, dan ikuti panduan setup kami. Tim support kami siap membantu proses migrasi.",
  },
  {
    question: "Apakah ada kontrak jangka panjang yang diperlukan?",
    answer: "Tidak, Anda dapat membatalkan kapan saja tanpa biaya tersembunyi. Kami menawarkan paket bulanan dengan fleksibilitas penuh.",
  },
  {
    question: "Bagaimana tentang uptime dan reliabilitas?",
    answer: "Kami menjamin 99.9% uptime dengan redundansi penuh. Semua layanan dilindungi oleh SLA yang komprehensif.",
  },
  {
    question: "Apakah data saya aman?",
    answer: "Ya, kami menggunakan enkripsi end-to-end, backup otomatis harian, dan compliance dengan standar internasional (ISO 27001, GDPR).",
  },
  {
    question: "Bagaimana proses upgrade atau downgrade layanan?",
    answer: "Anda dapat upgrade atau downgrade kapan saja melalui dashboard. Perubahan akan berlaku di billing cycle berikutnya.",
  },
  {
    question: "Apakah ada free trial tersedia?",
    answer: "Ya, semua layanan cloud hosting mendapatkan 7 hari trial gratis tanpa perlu kartu kredit.",
  },
];

export default function Services() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("hosting");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredServices = SERVICES.filter((service) => service.category === activeCategory);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
      <Navigation />

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 animate-fade-in">
            Layanan Cloud Lengkap
          </h1>
          <p className="text-lg text-gray-300 mb-4 max-w-2xl mx-auto">
            Solusi infrastruktur cloud terpercaya untuk berbagai kebutuhan bisnis Anda
          </p>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Dari startup hingga enterprise, kami menyediakan layanan dengan performa tinggi, keamanan terjamin, dan support 24/7
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="relative z-10 px-4 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                    : "bg-[#1a1a2e] text-gray-300 hover:bg-[#2a2a4e] border border-[#2a2a4e]"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <div className="text-center mb-12">
            <p className="text-gray-400">
              {CATEGORIES.find((c) => c.id === activeCategory)?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="relative z-10 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                price={service.price}
                buttonText="Pesan Sekarang"
                highlight={service.id === "vps-standard" || service.id === "premium-support"}
                onButtonClick={() => window.location.href = "/pricing"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="relative z-10 px-4 py-16 border-t border-[#2a2a4e]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Mengapa Pilih DzakCloud?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Kami menyediakan solusi cloud terbaik dengan teknologi terkini dan layanan pelanggan yang responsif
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-400" />,
                title: "Performa Tinggi",
                description: "Infrastruktur dengan teknologi terbaru untuk kecepatan maksimal",
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Keamanan Terjamin",
                description: "Perlindungan berlapis dengan enkripsi dan monitoring 24/7",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
                title: "Skalabilitas Fleksibel",
                description: "Mudah scale up atau down sesuai kebutuhan bisnis Anda",
              },
              {
                icon: <Headphones className="w-8 h-8 text-blue-400" />,
                title: "Support 24/7",
                description: "Tim ahli kami siap membantu kapan pun Anda membutuhkan",
              },
              {
                icon: <Code className="w-8 h-8 text-blue-400" />,
                title: "API Lengkap",
                description: "Integrasi mudah dengan API dokumentasi yang comprehensive",
              },
              {
                icon: <GitBranch className="w-8 h-8 text-blue-400" />,
                title: "Free Migration",
                description: "Migrasi gratis dari provider lain tanpa downtime",
              },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-[#1a1a2e] border border-[#2a2a4e] hover:border-blue-500/30 transition-colors">
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Pertanyaan Umum</h2>
          <p className="text-gray-400 text-center mb-12">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami
          </p>

          <div className="space-y-4">
            {FAQ.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-[#1a1a2e] border border-[#2a2a4e] hover:border-blue-500/30 transition-colors cursor-pointer"
                onClick={() => setExpandedFAQ(expandedFAQ === String(index) ? null : String(index))}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-400 transition-transform duration-300 ${
                      expandedFAQ === String(index) ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expandedFAQ === String(index) && (
                  <p className="text-gray-400 mt-4 animate-fade-in">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-xl p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Siap Memulai?</h2>
          <p className="text-gray-300 mb-8">
            Dapatkan akses instant ke semua layanan cloud kami dengan kualitas enterprise
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Daftar Akun
            </button>
            <button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`)}
              className="px-8 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg font-medium transition-colors"
            >
              Hubungi Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
