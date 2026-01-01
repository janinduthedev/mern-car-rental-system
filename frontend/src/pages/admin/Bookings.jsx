import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AdminBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const { data } = await api.get("/bookings", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBookings(data);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Bookings 📅</h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">
              {b.car.name} — {b.car.brand}
            </p>
            <p>User: {b.user.name}</p>
            <p>
              {b.startDate.slice(0, 10)} → {b.endDate.slice(0, 10)}
            </p>
            <p className="font-semibold">Total: ${b.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;
