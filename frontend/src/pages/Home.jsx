import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [cars, setCars] = useState([]);
  const { user, logout } = useAuth();

  const fetchCars = async () => {
    const { data } = await api.get("/cars");
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Available Cars 🚗</h1>
        {user && (
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} onBooked={fetchCars} />
        ))}
      </div>
    </div>
  );
};

export default Home;
