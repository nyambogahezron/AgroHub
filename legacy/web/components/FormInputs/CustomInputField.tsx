import { Box, InputAdornment, TextField } from '@mui/material';
import { CustomInputFieldProps } from '@/types';

export default function CustomInputField({
  id,
  name,
  label,
  placeholder,
  variant,
  fullWidth = true,
  margin = 'normal',
  containerStyles,
  textInputStyles,
  type,
  required = false,
  onChange,
  value,
  showInputAdornment = true,
  icon: Icon,
  inputRef,
  disabled,
}: CustomInputFieldProps) {
  return (
    <Box className={containerStyles}>
      <TextField
        id={id}
        name={name}
        label={label}
        variant={variant}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={textInputStyles}
        required={required}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        margin={margin}
        inputRef={inputRef}
        InputProps={
          showInputAdornment && Icon
            ? {
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon />
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}
