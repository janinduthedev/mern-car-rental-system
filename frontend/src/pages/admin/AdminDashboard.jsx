import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Admin Dashboard <span className="text-blue-600">.</span>
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage your fleet and customer reservations.
              </p>
            </div>
            <Link
              to="/"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Cars Card */}
          <Link
            to="/admin/cars"
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                <span className="text-3xl group-hover:filter group-hover:brightness-0 group-hover:invert">
                  🚗
                </span>
              </div>
              <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                Manage →
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">
                Vehicle Inventory
              </h3>
              <p className="text-gray-500 mt-2">
                Add new cars to your fleet, edit pricing details, or update
                vehicle availability status.
              </p>
            </div>
          </Link>

          {/* View Bookings Card */}
          <Link
            to="/admin/bookings"
            className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-300">
                <span className="text-3xl group-hover:filter group-hover:brightness-0 group-hover:invert">
                  📅
                </span>
              </div>
              <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                View All →
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800">
                Rental Bookings
              </h3>
              <p className="text-gray-500 mt-2">
                Monitor active reservations, review customer details, and track
                your revenue growth.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
