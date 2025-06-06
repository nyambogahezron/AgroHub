import { z } from 'zod';

export const yieldSchema: z.ZodObject<{
	date: z.ZodString;
	crop: z.ZodString;
	quantity: z.ZodNumber;
	unit: z.ZodEnum<['kg', 'ton', 'bushel']>;
	field: z.ZodEnum<['North', 'South', 'East', 'West']>;
}>;

export type YieldFormData = z.infer<typeof yieldSchema>;
