import { prisma } from '../db.js'

export const getStats = async (req, res, next) => {
  try {
    const [totalBookings, totalUsers, totalRooms, revenueResult, recentBookings] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.room.count(),
      prisma.booking.aggregate({
        _sum: { totalPrice: true },
        where: { status: { not: 'cancelled' } },
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
          room: { select: { name: true } },
        },
      }),
    ])

    res.json({
      totalBookings,
      totalUsers,
      totalRooms,
      totalRevenue: revenueResult._sum.totalPrice ?? 0,
      recentBookings,
    })
  } catch (error) {
    next(error)
  }
}
