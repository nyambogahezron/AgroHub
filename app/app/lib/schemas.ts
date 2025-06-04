import { z } from 'zod';

export const yieldSchema = z.object({
	date: z.string(),
	crop: z.string(),
	quantity: z.number(),
	unit: z.string(),
	field: z.string(),
});

export type YieldFormData = z.infer<typeof yieldSchema>;
