import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Create Booking
export const createBooking = async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  const car = await Car.findById(carId);
  if (!car) return res.status(404).json({ message: "Car not found" });
  if (!car.isAvailable) return res.status(400).json({ message: "Car not available" });

  const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
  const totalPrice = days * car.pricePerDay;

  const booking = await Booking.create({
    user: req.user._id,
    car: carId,
    startDate,
    endDate,
    totalPrice,
  });

  car.isAvailable = false;
  await car.save();

  res.status(201).json(booking);
};

// Get my bookings
export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("car");
  res.json(bookings);
};

// Get all bookings (Admin)
export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({})
    .populate("user", "name email role")
    .populate("car", "name brand");

  res.json(bookings);
};
