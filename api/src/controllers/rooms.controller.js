import { prisma } from '../db.js';

// Get all rooms
export const getRooms = async (req, res, next) => {
  const rooms = await prisma.room.findMany();
  res.status(200).json(rooms).end();
};

// Get a room by ID
export const getRoomById = async (req, res, next) => {
  const { id } = req.params;
  const room = await prisma.room.findUnique({ where: { id: parseInt(id) } });

  if (!room) {
    return res.status(404).json({ message: "Room not found" }).end();
  }

  res.status(200).json(room).end();
};

// Create a new room
export const createRoom = async (req, res, next) => {
  const { name, type, capacity, family, price, featured, description, amenities, image } = req.body;
  const newRoom = await prisma.room.create({
    data: { name, type, capacity, family, price, featured, description, amenities, image },
  });
  res.status(201).json(newRoom).end();
};

// Update a room by ID
export const updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const { name, type, capacity, family, price, featured, description, amenities, image } = req.body;
  const room = await prisma.room.update({
    where: { id: parseInt(id) },
    data: { name, type, capacity, family, price, featured, description, amenities, image },
  });
  res.status(200).json(room).end();
};

// Delete a room by ID
export const deleteRoom = async (req, res, next) => {
  const { id } = req.params;
  await prisma.room.delete({ where: { id: parseInt(id) } });
  res.status(204).end();
};
