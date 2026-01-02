import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const ManageCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    brand: "",
    pricePerDay: "",
    image: "",
  });

  const fetchCars = async () => {
    try {
      const { data } = await api.get("/cars");
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleUpload = () => {
    if (!window.cloudinary) return;
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        multiple: false,
        theme: "minimal",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setForm({ ...form, image: result.info.secure_url });
        }
      }
    );
  };

  const startEdit = (car) => {
    setEditingId(car._id);
    setForm({
      name: car.name,
      brand: car.brand,
      pricePerDay: car.pricePerDay,
      image: car.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", brand: "", pricePerDay: "", image: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/cars/${editingId}`, form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await api.post("/cars", form, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
      cancelEdit();
      fetchCars();
    } catch (err) {
      alert("Action failed");
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm("Remove this vehicle?")) {
      try {
        await api.delete(`/cars/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchCars();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 pb-24">
      {/* Refined Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div>
            <Link
              to="/admin"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
            >
              ← Back to Admin
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">
              Inventory Manager
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Live Assets: {cars.length}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Minimalist Entry Form */}
        <div className="bg-white rounded-4xl p-10 shadow-sm border border-slate-100 mb-16 max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-800">
              {editingId ? "Edit Vehicle Info" : "Register New Asset"}
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Enter the technical specifications and imagery
            </p>
          </header>

          <form onSubmit={submitHandler} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Model Name
                </label>
                <input
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Manufacturer
                </label>
                <input
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Daily Rate (LKR)
                </label>
                <input
                  type="number"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-blue-600/20 transition-all outline-none font-medium"
                  value={form.pricePerDay}
                  onChange={(e) =>
                    setForm({ ...form, pricePerDay: e.target.value })
                  }
                  required
                />
              </div>

              {/* Minimal Image Upload Area */}
              <div className="md:row-span-1">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1 block mb-1">
                  Visual Preview
                </label>
                {form.image ? (
                  <div className="relative group overflow-hidden rounded-2xl aspect-video border border-slate-100 shadow-inner">
                    <img
                      src={form.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Preview"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, image: "" })}
                      className="absolute top-2 right-2 bg-white/90 backdrop-blur p-2 rounded-full text-slate-400 hover:text-rose-600 transition-colors shadow-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Add Media
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-6">
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                className={`px-12 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:-translate-y-1 active:scale-95 ${
                  editingId
                    ? "bg-orange-500 shadow-orange-200"
                    : "bg-slate-900 shadow-slate-200 hover:bg-blue-600 hover:shadow-blue-200"
                }`}
              >
                {editingId ? "Save Changes" : "Confirm Entry"}
              </button>
            </div>
          </form>
        </div>

        {/* Minimal Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cars.map((car) => (
            <div
              key={car._id}
              className="group bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-50"
            >
              <div className="aspect-4/3 rounded-4xl overflow-hidden mb-6 relative">
                <img
                  src={car.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={car.name}
                />
                <div
                  className={`absolute top-4 right-4 text-[9px] font-black tracking-widest px-3 py-1.5 rounded-full ${
                    car.isAvailable
                      ? "bg-white text-emerald-600"
                      : "bg-white/80 text-rose-500 backdrop-blur"
                  }`}
                >
                  {car.isAvailable ? "AVAILABLE" : "ON RENTAL"}
                </div>
              </div>

              <div className="px-4 pb-6">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                  {car.brand}
                </p>
                <h3 className="text-xl font-semibold tracking-tight text-slate-800 mb-4">
                  {car.name}
                </h3>

                <div className="flex items-end justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                      Per Day
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      LKR {car.pricePerDay}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => startEdit(car)}
                    className="py-3.5 rounded-2xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCar(car._id)}
                    className="py-3.5 rounded-2xl border border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-500 transition-all"
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
