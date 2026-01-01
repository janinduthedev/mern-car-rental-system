import { useEffect, useState } from "react";
import api from "../services/api";
import CarCard from "../components/CarCard";

const Home = () => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    const { data } = await api.get("/cars");
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Available Cars 🚗</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} onBooked={fetchCars} />
        ))}
      </div>
    </div>
  );
};

export default Home;
