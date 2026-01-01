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
    image: car.image,
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
  try {
    const bookings = await Booking.find({})
      .populate("user", "name email") // User ගේ නම සහ Email එක ගනියි
      .populate("car", "name brand image pricePerDay"); // <--- මෙන්න මෙතන "image" කියන එක අනිවාර්යයෙන්ම තියෙන්න ඕනේ!

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// Delete Booking (Admin)
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Optional: If you want to make the car available again when a booking is deleted
    if (booking.car) {
      await Car.findByIdAndUpdate(booking.car, { isAvailable: true });
    }

    await booking.deleteOne();
    res.json({ message: "Booking removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.body;
    const booking = await Booking.findById(req.params.id).populate("car");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update fields if provided in request body
    if (startDate) booking.startDate = startDate;
    if (endDate) booking.endDate = endDate;
    if (status) booking.status = status;

    // If dates changed, recalculate the total price
    if (startDate || endDate) {
      const days = (new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24) + 1;
      
      if (days <= 0) {
        return res.status(400).json({ message: "End date must be after start date" });
      }
      
      booking.totalPrice = days * booking.car.pricePerDay;
    }

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
