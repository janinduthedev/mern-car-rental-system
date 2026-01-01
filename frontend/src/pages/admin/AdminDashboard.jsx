import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard 👑</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          to="/admin/cars"
          className="bg-white p-6 rounded shadow text-center font-semibold hover:bg-gray-50"
        >
          Manage Cars 🚗
        </Link>

        <Link
          to="/admin/bookings"
          className="bg-white p-6 rounded shadow text-center font-semibold hover:bg-gray-50"
        >
          View Bookings 📅
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
