import { z } from 'zod'
import type { CategoriesAPIResponseSchema } from '../utils/recipe-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>