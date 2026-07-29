import { prisma } from '../db.js'
import { createContactSchema } from '../validations/contact.validations.js'

export const createContact = async (req, res, next) => {
  try {
    const data = createContactSchema.parse(req.body)
    const contact = await prisma.contact.create({ data })
    res.status(201).json(contact)
  } catch (error) {
    next(error)
  }
}

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

export const markAsRead = async (req, res, next) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: parseInt(req.params.id) },
      data: { read: true },
    })
    res.json(contact)
  } catch (error) {
    next(error)
  }
}
