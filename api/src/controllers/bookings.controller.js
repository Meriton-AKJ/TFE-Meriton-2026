import { prisma } from '../db.js'

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { user: { select: { id: true, name: true, email: true } }, room: true },
    })
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { room: { select: { id: true, name: true, type: true, image: true } } },
      orderBy: { createdAt: 'desc' },
    })
    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { user: { select: { id: true, name: true, email: true } }, room: true },
    })
    if (!booking) return res.status(404).json({ message: 'Réservation introuvable' })
    res.json(booking)
  } catch (error) {
    next(error)
  }
}

async function processBooking(userId, roomId, checkIn, checkOut, guests) {
  const checkInDate = new Date(checkIn)
  const checkOutDate = new Date(checkOut)

  const room = await prisma.room.findUnique({ where: { id: roomId } })
  if (!room) return { error: 'Chambre introuvable', status: 404 }

  const overlappingCount = await prisma.booking.count({
    where: {
      roomId,
      status: { not: 'cancelled' },
      AND: [
        { checkIn: { lt: checkOutDate } },
        { checkOut: { gt: checkInDate } },
      ],
    },
  })

  if (overlappingCount >= room.quantity) {
    return { error: 'Plus de chambres disponibles pour ces dates', status: 409 }
  }

  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
  const totalPrice = room.price * nights

  const booking = await prisma.booking.create({
    data: { userId, roomId, checkIn: checkInDate, checkOut: checkOutDate, guests, totalPrice },
  })

  return { booking }
}

export const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body
    const result = await processBooking(req.user.id, roomId, checkIn, checkOut, guests)
    if (result.error) return res.status(result.status).json({ message: result.error })
    res.status(201).json(result.booking)
  } catch (error) {
    next(error)
  }
}

export const createBookingAdmin = async (req, res, next) => {
  try {
    const { userId, roomId, checkIn, checkOut, guests } = req.body
    const result = await processBooking(userId, roomId, checkIn, checkOut, guests)
    if (result.error) return res.status(result.status).json({ message: result.error })
    res.status(201).json(result.booking)
  } catch (error) {
    next(error)
  }
}

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status },
    })
    res.json(booking)
  } catch (error) {
    next(error)
  }
}

export const deleteBooking = async (req, res, next) => {
  try {
    await prisma.booking.delete({ where: { id: parseInt(req.params.id) } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
