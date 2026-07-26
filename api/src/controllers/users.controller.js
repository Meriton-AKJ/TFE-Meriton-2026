import { prisma } from '../db.js'

export const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { role } = req.body
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.booking.deleteMany({ where: { userId: parseInt(req.params.id) } })
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
