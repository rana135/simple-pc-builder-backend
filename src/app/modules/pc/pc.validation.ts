import { z } from 'zod'

const createBookZodSchema = z.object({
  body: z.object({
    img: z.string().optional(),
    name: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
    status: z.string().optional(),
    rating: z.number().optional(),
    description: z.string().optional(),
  }),
})
export const bookValidation = {
    createBookZodSchema,
} 