import { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';

interface DialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
}

interface DialogContentProps {
	children: React.ReactNode;
	className?: string;
}

interface DialogHeaderProps {
	children: React.ReactNode;
	className?: string;
}

interface DialogFooterProps {
	children: React.ReactNode;
	className?: string;
}

interface DialogTitleProps {
	children: React.ReactNode;
	className?: string;
}

interface DialogDescriptionProps {
	children: React.ReactNode;
	className?: string;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
	return (
		<Modal
			visible={open}
			transparent
			animationType='fade'
			onRequestClose={() => onOpenChange(false)}
		>
			<View className='flex-1 items-center justify-center bg-black/50'>
				{children}
			</View>
		</Modal>
	);
}

export function DialogContent({ children, className }: DialogContentProps) {
	return (
		<View
			className={cn(
				'fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg',
				className
			)}
		>
			{children}
		</View>
	);
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
	return (
		<View
			className={cn(
				'flex flex-col space-y-1.5 text-center sm:text-left',
				className
			)}
		>
			{children}
		</View>
	);
}

export function DialogFooter({ children, className }: DialogFooterProps) {
	return (
		<View
			className={cn(
				'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
				className
			)}
		>
			{children}
		</View>
	);
}

export function DialogTitle({ children, className }: DialogTitleProps) {
	return (
		<Text
			className={cn(
				'text-lg font-semibold leading-none tracking-tight',
				className
			)}
		>
			{children}
		</Text>
	);
}

export function DialogDescription({
	children,
	className,
}: DialogDescriptionProps) {
	return (
		<Text className={cn('text-sm text-muted-foreground', className)}>
			{children}
		</Text>
	);
}

export function DialogClose() {
	return (
		<TouchableOpacity className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
			<X className='h-4 w-4' />
		</TouchableOpacity>
	);
}
