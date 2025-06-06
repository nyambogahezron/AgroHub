import { useState } from 'react';
import { z } from 'zod';

export function useForm<T extends z.ZodType>(schema: T) {
	const [values, setValues] = useState<Record<string, any>>({});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const setValue = (key: string, value: any) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	const watch = (key: string) => values[key];

	const handleSubmit = (onSubmit: (data: z.infer<T>) => void) => {
		return async () => {
			try {
				const validatedData = await schema.parseAsync(values);
				setErrors({});
				onSubmit(validatedData);
			} catch (error) {
				if (error instanceof z.ZodError) {
					const newErrors: Record<string, string> = {};
					error.errors.forEach((err) => {
						if (err.path[0]) {
							newErrors[err.path[0] as string] = err.message;
						}
					});
					setErrors(newErrors);
				}
			}
		};
	};

	const reset = () => {
		setValues({});
		setErrors({});
	};

	return {
		form: { values, errors, setValue, watch, handleSubmit, reset },
		handleSubmit,
	};
}
