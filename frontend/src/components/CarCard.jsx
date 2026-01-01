import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CarCard = ({ car, onBooked }) => {
  const { user } = useAuth();

  const bookCar = async () => {
    if (!user) {
      alert("Please login first to book a vehicle.");
      return;
    }

    const startDate = prompt("Enter start date (YYYY-MM-DD):");
    const endDate = prompt("Enter end date (YYYY-MM-DD):");

    if (!startDate || !endDate) return;

    try {
      await api.post(
        "/bookings",
        { carId: car._id, startDate, endDate },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Car booked successfully!");
      onBooked(); // Refresh the car list to update availability
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* --- Image Section --- */}
      <div className="relative h-48 overflow-hidden bg-slate-200">
        {/* Admin පැත්තෙන් upload කරපු image එක මෙතනින් display වෙනවා */}
        <img
          src={
            car.image ||
            "https://via.placeholder.com/400x250?text=No+Image+Available"
          }
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Availability Badge Overlay */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm ${
            car.isAvailable
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {car.isAvailable ? "Available" : "Booked"}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest">
              {car.brand}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-6">
          <span className="text-xl font-black text-slate-900">
            LKR {car.pricePerDay}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ day</span>
        </div>

        {/* --- Booking Button --- */}
        <button
          onClick={bookCar}
          disabled={!car.isAvailable}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
            car.isAvailable
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {car.isAvailable ? "Book This Ride" : "Currently Booked"}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
