import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ManageCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({ name: "", brand: "", pricePerDay: "" });

  const fetchCars = async () => {
    const { data } = await api.get("/cars");
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    await api.post("/cars", form, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setForm({ name: "", brand: "", pricePerDay: "" });
    fetchCars();
  };

  const deleteCar = async (id) => {
    if (window.confirm("Are you sure you want to remove this vehicle?")) {
      await api.delete(`/cars/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchCars();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header Area */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link
              to="/admin"
              className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1 mb-1"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Vehicle Inventory
            </h1>
          </div>
          <div className="text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
            Total Vehicles: {cars.length}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Add New Car Form --- */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 w-2 h-6 rounded-full"></span>
            Add New Vehicle
          </h2>
          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <input
              placeholder="Model Name (e.g. Civic)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Brand (e.g. Honda)"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              required
            />
            <div className="relative">
              <span className="absolute left-4 top-2.5 text-gray-400">$</span>
              <input
                placeholder="Price/Day"
                type="number"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={form.pricePerDay}
                onChange={(e) =>
                  setForm({ ...form, pricePerDay: e.target.value })
                }
                required
              />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-100 transition-all active:scale-95">
              + Register Car
            </button>
          </form>
        </section>

        {/* --- Car List --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {car.brand}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">
                      {car.name}
                    </h3>
                  </div>
                  <div className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded">
                    ACTIVE
                  </div>
                </div>

                <div className="flex items-baseline gap-1 text-gray-500 mb-6">
                  <span className="text-2xl font-black text-gray-900">
                    LKR {car.pricePerDay}/=
                  </span>
                  <span className="text-sm">/ day</span>
                </div>

                <div className="pt-4 border-t border-gray-50 flex gap-3">
                  <button className="flex-1 text-gray-600 font-semibold py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm">
                    Edit Details
                  </button>
                  <button
                    onClick={() => deleteCar(car._id)}
                    className="flex-1 bg-white text-red-500 font-semibold py-2 rounded-lg border border-red-100 hover:bg-red-50 transition-colors text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
