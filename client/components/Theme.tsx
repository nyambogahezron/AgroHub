import type {} from '@mui/material/themeCssVarsAugmentation';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
  },
});

export default function getLPTheme(mode) {
  return {
    ...getDesignTokens(mode),
  };
}
