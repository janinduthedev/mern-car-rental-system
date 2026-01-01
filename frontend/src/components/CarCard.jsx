import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const CarCard = ({ car, onBooked }) => {
  const { user } = useAuth();

  const bookCar = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    const startDate = prompt("Enter start date (YYYY-MM-DD)");
    const endDate = prompt("Enter end date (YYYY-MM-DD)");

    if (!startDate || !endDate) return;

    try {
      await api.post(
        "/bookings",
        { carId: car._id, startDate, endDate },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Car booked successfully!");
      onBooked();
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold">{car.name}</h3>
      <p className="text-gray-600">{car.brand}</p>
      <p className="font-semibold">${car.pricePerDay} / day</p>

      <p
        className={`mt-2 font-semibold ${
          car.isAvailable ? "text-green-600" : "text-red-600"
        }`}
      >
        {car.isAvailable ? "Available" : "Not Available"}
      </p>

      <button
        onClick={bookCar}
        disabled={!car.isAvailable}
        className={`mt-3 w-full p-2 rounded text-white ${
          car.isAvailable
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Book Now
      </button>
    </div>
  );
};

export default CarCard;
