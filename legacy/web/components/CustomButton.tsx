'use client';
import { CustomButtonProps } from '@/types';
import { Button } from '@mui/material';

export default function CustomButton({
  title,
  onClick,
  isLoading = false,
  containerStyles,
  textStyles,
  variant = 'contained',
  type = 'button',
}: CustomButtonProps) {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={isLoading}
      className={`bg-purple-700 mt-7 w-full py-2.5 rounded-lg ${containerStyles}`}
      variant={variant}
    >
      <span className={textStyles}>{title}</span>
    </Button>
  );
}
