import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Navigation() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const user = auth?.user || null;
  const isAuthenticated = auth?.isAuthenticated || false;
  const logout = auth?.logout || (() => {});

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <div className="w-full max-w-6xl bg-gradient-to-r from-blue-600/20 to-blue-500/20 backdrop-blur-md rounded-full border border-blue-500/30 px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/favicon.ico"
              alt="DzakCloud"
              className="w-8 h-8 hover:scale-110 transition-transform"
            />
            <span className="font-semibold text-white">DzakCloud</span>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/pricing"
            className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Produk
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Contact
          </Link>
          <Link
            to="/services"
            className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
          >
            Services
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isAuthenticated && user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600/30 hover:bg-red-600/40 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
