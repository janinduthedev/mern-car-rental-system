import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

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

      <Hero />

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
