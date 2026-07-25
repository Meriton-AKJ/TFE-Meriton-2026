import { z } from 'zod'

export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'id doit être un nombre entier positif"),
})

export const createBookingSchema = z.object({
  roomId:   z.number().int().positive("L'id de la chambre est obligatoire"),
  checkIn:  z.string().min(1, "La date d'arrivée est obligatoire"),
  checkOut: z.string().min(1, "La date de départ est obligatoire"),
  guests:   z.number().int().min(1, 'Le nombre de personnes est obligatoire'),
}).refine(
  (data) => new Date(data.checkOut) > new Date(data.checkIn),
  { message: 'La date de départ doit être après la date d\'arrivée', path: ['checkOut'] }
)

export const updateBookingSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
})
