import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, Mail, Calendar } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e] flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Profile updated successfully!");
        setEditMode(false);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1e] via-[#1a1a2e] to-[#0f0f1e]">
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
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-400">Manage your DzakCloud account</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg overflow-hidden sticky top-8">
                <div className="p-6 border-b border-gray-700/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <p className="text-white font-semibold">{user.name}</p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>

                <div className="p-4 space-y-2">
                  {[
                    { id: "overview", label: "Overview", icon: Settings },
                    { id: "profile", label: "Profile", icon: Settings },
                    { id: "payments", label: "Payments", icon: Settings },
                    { id: "support", label: "Support", icon: Settings },
                  ].map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                          activeTab === tab.id
                            ? "bg-blue-600/30 border border-blue-500/50 text-blue-300"
                            : "text-gray-400 hover:text-white hover:bg-gray-700/30"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Active Services", value: "3", color: "text-blue-400" },
                      { label: "Total Spent", value: "Rp. 150.000", color: "text-green-400" },
                      { label: "Account Age", value: "2 months", color: "text-purple-400" },
                    ].map((stat, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6"
                      >
                        <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        { action: "Purchased Virtual Server plan", date: "2 days ago", status: "completed" },
                        { action: "Updated profile information", date: "1 week ago", status: "completed" },
                        { action: "Submitted support ticket", date: "2 weeks ago", status: "resolved" },
                      ].map((activity, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-700/30 last:border-0">
                          <div>
                            <p className="text-white">{activity.action}</p>
                            <p className="text-gray-400 text-sm">{activity.date}</p>
                          </div>
                          <span className="px-3 py-1 bg-green-500/10 text-green-300 text-xs rounded-full">
                            {activity.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-semibold text-white">Profile Settings</h3>
                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>

                  {message && (
                    <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg mb-6 text-green-300 text-sm">
                      {message}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      ) : (
                        <p className="text-white">{user.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      {editMode ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400 transition-colors"
                        />
                      ) : (
                        <p className="text-white">{user.email}</p>
                      )}
                    </div>

                    {/* Created Date */}
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Account Created
                      </label>
                      <p className="text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Save Button */}
                    {editMode && (
                      <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeTab === "payments" && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Payment History
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">Virtual Server Plan</p>
                        <p className="text-green-400 font-semibold">Rp. 50.000,00</p>
                      </div>
                      <p className="text-gray-400 text-sm">Payment ID: PAYMENT-1770384325854</p>
                      <p className="text-gray-400 text-sm">Status: Pending</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Support Tab */}
              {activeTab === "support" && (
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      Our support team is here to help! You can contact us through:
                    </p>
                    <ul className="space-y-3 text-gray-400">
                      <li>📧 Email: support@dzakcloud.com</li>
                      <li>📞 Phone: +62 123 4567 8900</li>
                      <li>💬 Live Chat: Available 24/7 on our website</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
