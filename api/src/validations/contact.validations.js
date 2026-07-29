import { z } from 'zod'

export const createContactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est obligatoire'),
  lastName:  z.string().min(1, 'Le nom est obligatoire'),
  email:     z.string().email('Email invalide'),
  subject:   z.string().min(1, 'Le sujet est obligatoire'),
  message:   z.string().min(10, 'Le message doit faire au moins 10 caractères'),
})
