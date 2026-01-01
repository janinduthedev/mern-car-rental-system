import Car from "../models/Car.js";

// Get all cars
export const getCars = async (req, res) => {
  const cars = await Car.find({});
  res.json(cars);
};

// Create a car
export const createCar = async (req, res) => {
  const { name, brand, pricePerDay, image } = req.body;

  const car = new Car({ name, brand, pricePerDay, image });
  const createdCar = await car.save();
  res.status(201).json(createdCar);
};

// Update a car
export const updateCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });

  car.name = req.body.name || car.name;
  car.brand = req.body.brand || car.brand;
  car.pricePerDay = req.body.pricePerDay || car.pricePerDay;
  car.image = req.body.image || car.image;
  car.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : car.isAvailable;

  const updatedCar = await car.save();
  res.json(updatedCar);
};

// Delete a car
export const deleteCar = async (req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).json({ message: "Car not found" });

  await car.deleteOne();
  res.json({ message: "Car removed" });
};
