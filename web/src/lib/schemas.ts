import { z } from 'zod';

// Expense Schema
export const expenseSchema = z.object({
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
	category: z.enum([
		'Seeds',
		'Fertilizer',
		'Pesticides',
		'Fuel',
		'Equipment',
		'Labor',
		'Other',
	]),
	amount: z.number().positive('Amount must be positive'),
	description: z
		.string()
		.min(1, 'Description is required')
		.max(200, 'Description too long'),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;

// Yield Schema
export const yieldSchema = z.object({
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
	crop: z.string().min(1, 'Crop name is required'),
	quantity: z.number().positive('Quantity must be positive'),
	unit: z.enum(['kg', 'ton', 'bushel']),
	field: z.enum(['North', 'South', 'East', 'West']),
});

export type YieldFormData = z.infer<typeof yieldSchema>;

// Labor Schema
export const laborSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	role: z.enum([
		'Harvester',
		'Field Worker',
		'Equipment Operator',
		'Supervisor',
		'Other',
	]),
	hours: z
		.number()
		.positive('Hours must be positive')
		.max(24, 'Hours cannot exceed 24'),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
	rate: z.number().positive('Rate must be positive'),
});

export type LaborFormData = z.infer<typeof laborSchema>;

// Inventory Schema
export const inventorySchema = z.object({
	name: z.string().min(1, 'Name is required'),
	category: z.enum([
		'Seeds',
		'Fertilizer',
		'Pesticides',
		'Fuel',
		'Equipment',
		'Other',
	]),
	quantity: z.number().min(0, 'Quantity cannot be negative'),
	unit: z.enum(['kg', 'liters', 'pcs', 'units']),
	lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
});

export type InventoryFormData = z.infer<typeof inventorySchema>;
