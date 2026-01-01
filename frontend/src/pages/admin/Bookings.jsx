import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AdminBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null);
  const [editBooking, setEditBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setBookings(data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchBookings();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this reservation record?")) {
      try {
        await api.delete(`/bookings/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchBookings();
      } catch (error) {
        alert("Action failed");
      }
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await api.put(
        `/bookings/${editBooking._id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setEditBooking(null);
      fetchBookings();
    } catch (error) {
      alert("Update failed");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-600";
      case "Completed":
        return "bg-blue-50 text-blue-600";
      case "Cancelled":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-amber-50 text-amber-600";
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Loading Fleet Data
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 pb-24">
      {/* Unified Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div>
            <Link
              to="/admin"
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors"
            >
              ← Dashboard
            </Link>
            <h1 className="text-xl font-semibold tracking-tight">
              Reservations Manager
            </h1>
          </div>
          <button
            onClick={fetchBookings}
            className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"
          >
            Refresh Data
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="group bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                <div className="flex gap-6">
                  {/* Large Asset Preview */}
                  <div className="w-44 h-32 flex-shrink-0 rounded-[1.5rem] overflow-hidden relative">
                    <img
                      src={b.car?.image || "https://via.placeholder.com/300"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                      onClick={() => setSelectedImg(b.car?.image)}
                      alt="vehicle"
                    />
                  </div>

                  {/* Booking Core Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                          {b.car?.brand || "Fleet"}
                        </p>
                        <h3 className="text-lg font-semibold tracking-tight text-slate-800">
                          {b.car?.name || "Deleted Asset"}
                        </h3>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusStyle(
                          b.status
                        )}`}
                      >
                        {b.status || "Pending"}
                      </span>
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium text-slate-700">
                        {b.user?.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate w-48">
                        {b.user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        Duration
                      </p>
                      <p className="text-[11px] font-bold text-slate-600">
                        {b.startDate?.split("T")[0]} —{" "}
                        {b.endDate?.split("T")[0]}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        Revenue
                      </p>
                      <p className="text-[11px] font-bold text-slate-900 underline decoration-blue-200 decoration-2">
                        LKR {b.totalPrice?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditBooking(b);
                        setNewStatus(b.status || "Pending");
                      }}
                      className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"
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
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm"
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
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-24 text-center border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Archive Empty
            </p>
          </div>
        )}
      </main>

      {/* Minimalist Status Update Overlay */}
      {editBooking && (
        <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300 border border-slate-100">
            <header className="mb-8">
              <h2 className="text-xl font-semibold tracking-tight">
                Status Update
              </h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {editBooking.car?.name}
              </p>
            </header>

            <div className="grid grid-cols-1 gap-2 mb-10">
              {["Pending", "Confirmed", "Completed", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setNewStatus(status)}
                    className={`w-full text-left px-5 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      newStatus === status
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200 translate-x-1"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setEditBooking(null)}
                className="flex-1 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimal Lightbox */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-white/95 z-[60] flex items-center justify-center p-12 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            className="max-w-full max-h-full rounded-[2.5rem] shadow-2xl shadow-slate-300"
            alt="zoom"
          />
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
