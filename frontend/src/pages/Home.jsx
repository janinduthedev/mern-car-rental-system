import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const [cars, setCars] = useState([]);
  const { user, logout } = useAuth();

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (error) {
      console.error("Failed to fetch cars", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* --- Navigation Bar --- */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-black text-blue-600 tracking-tighter">
                DRIVE<span className="text-slate-800">NEST</span>
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      className="hidden md:block text-sm font-semibold text-amber-600 hover:bg-amber-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="flex items-center gap-3 pl-4 border-l">
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      Hi, {user.name || "User"}
                    </span>
                    <button
                      onClick={logout}
                      className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md active:scale-95"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white text-sm px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- Minimalist Interaction Hero --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
        <div className="relative group overflow-hidden bg-white rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] transition-all duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[550px]">
            {/* Content Area */}
            <div className="p-8 md:p-16 lg:p-20 relative z-10 order-2 lg:order-1">
              <header className="space-y-6">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600/60">
                  Curated Collection 2026
                </div>

                <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                  Elegance <br />
                  <span className="text-slate-300">in motion.</span>
                </h1>

                <p className="mt-8 text-slate-400 text-lg md:text-xl leading-relaxed max-w-sm font-light">
                  Defining the new standard for premium mobility through a
                  strictly vetted fleet.
                </p>
              </header>

              {/* Text-Based Interactions (No Buttons) */}
              <div className="mt-12 flex items-center gap-12">
                <Link
                  to="/cars"
                  className="group/link flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900 transition-all"
                >
                  <span className="border-b-2 border-slate-900 pb-1 group-hover/link:text-blue-600 group-hover/link:border-blue-600 transition-colors">
                    Browse Inventory
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>

                <Link
                  to="/about"
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-600 transition-colors border-b-2 border-transparent pb-1"
                >
                  Our Philosophy
                </Link>
              </div>
            </div>

            {/* Immersive Image Surface */}
            <div className="relative h-full min-h-[400px] lg:min-h-full order-1 lg:order-2 bg-slate-50 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=2070"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]"
                alt="Luxury Vehicle"
              />

              {/* Minimal Floating Info */}
              <div className="absolute top-10 right-10 text-right">
                <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.3em]">
                  Location
                </p>
                <p className="text-white text-xs font-bold tracking-widest uppercase">
                  Colombo, LK
                </p>
              </div>

              {/* Bottom Detail Overlay */}
              <div className="absolute bottom-10 left-10 text-white/90">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 bg-white/30"></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Series 01 // Asset 09
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 p-8">
            <div className="w-16 h-[1px] bg-slate-100"></div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Available Vehicles
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full mt-1"></div>
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {cars.length} cars found
          </span>
        </div>

        {/* Grid Layout */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <CarCard car={car} onBooked={fetchCars} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              No cars available at the moment. Check back soon!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
