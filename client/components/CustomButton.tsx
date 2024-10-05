'use client';
import { Button } from '@mui/material';

type CustomButtonProps = {
  title: string;
  onClick?: () => void;
  isLoading?: boolean;
  containerStyles?: string;
  textStyles?: string;
  variant?: 'contained' | 'outlined';
};

export default function CustomButton({
  title,
  onClick,
  isLoading = false,
  containerStyles,
  textStyles,
  variant = 'contained',
}: CustomButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      className={`bg-purple-700 mt-7 w-full py-2.5 rounded-lg ${containerStyles}`}
      variant={variant}
    >
      <span className={textStyles}>{title}</span>
    </Button>
  );
}
