import { z } from "zod";

// Validation for booking ID
export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'id doit être un nombre entier positif"),
});

// Validation for creating a booking
export const createBookingSchema = z.object({
  userId:     z.number().int().positive("L'id utilisateur est obligatoire"),
  roomId:     z.number().int().positive("L'id de la chambre est obligatoire"),
  checkIn:    z.string().min(1, "La date d'arrivée est obligatoire"),
  checkOut:   z.string().min(1, "La date de départ est obligatoire"),
  guests:     z.number().int().min(1, "Le nombre de personnes est obligatoire"),
  totalPrice: z.number().positive("Le prix total doit être positif"),
});

// Validation for updating a booking
export const updateBookingSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});
