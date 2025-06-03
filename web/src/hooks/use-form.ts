import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';

export function useForm<T extends z.ZodType>(schema: T) {
	const { toast } = useToast();

	const form = useHookForm<z.infer<T>>({
		resolver: zodResolver(schema),
		defaultValues: {} as z.infer<T>,
	});

	const handleSubmit = async (
		onSubmit: (data: z.infer<T>) => Promise<void> | void
	) => {
		try {
			await form.handleSubmit(async (data) => {
				await onSubmit(data);
				toast({
					title: 'Success',
					description: 'Form submitted successfully',
				});
			})();
		} catch (error) {
			if (error instanceof z.ZodError) {
				const errors = error.errors.map((err) => err.message).join('\n');
				toast({
					title: 'Validation Error',
					description: errors,
					variant: 'destructive',
				});
			} else {
				toast({
					title: 'Error',
					description: 'An unexpected error occurred',
					variant: 'destructive',
				});
			}
		}
	};

	return {
		form,
		handleSubmit,
	};
}
