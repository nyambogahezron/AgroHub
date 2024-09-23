import type {} from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});

export default function getLPTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
  };
}
