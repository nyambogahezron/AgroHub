import { z } from 'zod';

export const yieldSchema = z.object({
	date: z.string(),
	crop: z.string().min(1, 'Crop is required'),
	quantity: z.number().min(0, 'Quantity must be positive'),
	unit: z.enum(['kg', 'ton', 'bushel']),
	field: z.enum(['North', 'South', 'East', 'West']),
});

export type YieldFormData = z.infer<typeof yieldSchema>;

export const laborSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	hours: z.number().min(0, 'Hours must be positive'),
	rate: z.number().min(0, 'Rate must be positive'),
	date: z.string().min(1, 'Date is required'),
});

export type LaborFormData = z.infer<typeof laborSchema>;
