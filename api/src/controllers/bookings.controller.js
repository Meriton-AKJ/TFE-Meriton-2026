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

export const createBooking = async (req, res, next) => {
  try {
    const { roomId, checkIn, checkOut, guests } = req.body
    const userId = req.user.id

    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)

    // Récupérer la chambre et sa quantity
    const room = await prisma.room.findUnique({ where: { id: roomId } })
    if (!room) return res.status(404).json({ message: 'Chambre introuvable' })

    // Compter les réservations actives qui chevauchent ces dates
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
      return res.status(409).json({ message: 'Plus de chambres disponibles pour ces dates' })
    }

    // Calculer le prix total côté serveur
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    const totalPrice = room.price * nights

    const booking = await prisma.booking.create({
      data: { userId, roomId, checkIn: checkInDate, checkOut: checkOutDate, guests, totalPrice },
    })

    res.status(201).json(booking)
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
