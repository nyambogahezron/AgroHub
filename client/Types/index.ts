import { PaletteMode } from "@mui/material";

type HomeNavDataProps = {
  id: number;
  name: string;
};

type FeaturesItemProps = {
  icon: any;
  title: string;
  description: string;
  imageLight: string;
  imageDark: string;
};



interface HomeNavbarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export type { HomeNavDataProps, FeaturesItemProps, HomeNavbarProps };
