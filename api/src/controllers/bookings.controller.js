import { prisma } from '../db.js';

// Get all bookings
export const getBookings = async (req, res, next) => {
  const bookings = await prisma.booking.findMany({
    include: { user: true, room: true },
  });
  res.status(200).json(bookings).end();
};

// Get a booking by ID
export const getBookingById = async (req, res, next) => {
  const { id } = req.params;
  const booking = await prisma.booking.findUnique({
    where: { id: parseInt(id) },
    include: { user: true, room: true },
  });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" }).end();
  }

  res.status(200).json(booking).end();
};

// Create a new booking
export const createBooking = async (req, res, next) => {
  const { userId, roomId, checkIn, checkOut, guests, totalPrice } = req.body;

  const overlap = await prisma.booking.findFirst({
    where: {
      roomId,
      status: { not: 'cancelled' },
      checkIn:  { lt: new Date(checkOut) },
      checkOut: { gt: new Date(checkIn) },
    },
  });

  if (overlap) {
    return res.status(409).json({ message: "Room already booked for these dates" }).end();
  }

  const newBooking = await prisma.booking.create({
    data: { userId, roomId, checkIn: new Date(checkIn), checkOut: new Date(checkOut), guests, totalPrice },
  });
  res.status(201).json(newBooking).end();
};

// Update a booking by ID
export const updateBooking = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const booking = await prisma.booking.update({
    where: { id: parseInt(id) },
    data: { status },
  });
  res.status(200).json(booking).end();
};

// Delete a booking by ID
export const deleteBooking = async (req, res, next) => {
  const { id } = req.params;
  await prisma.booking.delete({ where: { id: parseInt(id) } });
  res.status(204).end();
};
