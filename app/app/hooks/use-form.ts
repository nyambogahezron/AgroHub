import { useForm as useTanstackForm } from '@tanstack/react-form';
import { z } from 'zod';

export function useForm<T extends z.ZodType>(schema: T) {
	return useTanstackForm({
		defaultValues: {},
		onSubmit: async ({ value }: { value: z.infer<T> }) => {
			schema.parse(value);
		},
	});
}
