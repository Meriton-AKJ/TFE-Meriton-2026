import { z } from "zod";

// Validation for room ID
export const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'id doit être un nombre entier positif"),
});

// Validation for creating a room
export const createRoomSchema = z.object({
  name:        z.string().min(1, "Le nom est obligatoire"),
  type:        z.enum(["standard", "superieure", "suite"], { message: "Le type doit être standard, superieure ou suite" }),
  capacity:    z.number().int().min(1, "La capacité est obligatoire"),
  family:      z.boolean().optional(),
  price:       z.number().positive("Le prix doit être positif"),
  featured:    z.boolean().optional(),
  description: z.string().min(1, "La description est obligatoire"),
  amenities:   z.array(z.string()).min(1, "Au moins un équipement est requis"),
  image:       z.string().min(1, "L'image est obligatoire"),
});

// Validation for updating a room
export const updateRoomSchema = z.object({
  name:        z.string().min(1).optional(),
  type:        z.enum(["standard", "superieure", "suite"]).optional(),
  capacity:    z.number().int().min(1).optional(),
  family:      z.boolean().optional(),
  price:       z.number().positive().optional(),
  featured:    z.boolean().optional(),
  description: z.string().min(1).optional(),
  amenities:   z.array(z.string()).optional(),
  image:       z.string().min(1).optional(),
});
