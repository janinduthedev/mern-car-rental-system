import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      const { data } = await api.get("/bookings/my", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setBookings(data);
    };

    fetchBookings();
  }, [user, navigate]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">My Bookings 📅</h1>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold">
                {booking.car.name} ({booking.car.brand})
              </h3>
              <p>
                {booking.startDate.slice(0, 10)} →{" "}
                {booking.endDate.slice(0, 10)}
              </p>
              <p className="font-semibold">Total: ${booking.totalPrice}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
