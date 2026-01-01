import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

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
    await api.delete(`/cars/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchCars();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Cars 🚗</h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <input
          placeholder="Name"
          className="border p-2 mr-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Brand"
          className="border p-2 mr-2"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
        <input
          placeholder="Price/Day"
          type="number"
          className="border p-2 mr-2"
          value={form.pricePerDay}
          onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Car
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{car.name}</h3>
            <p>{car.brand}</p>
            <p>${car.pricePerDay}/day</p>
            <button
              onClick={() => deleteCar(car._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCars;
