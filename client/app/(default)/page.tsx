'use client';
import { PaletteMode, CssBaseline, Box, Divider } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HomeNavbar from '../../components/Navbar';
import {
  Hero,
  Highlights,
  Pricing,
  Features,
  Testimonials,
  FAQ,
} from '../../components/pageSections';
import Footer from '../../components/Footer';
import getLPTheme from '../../components/Theme';
import { useState } from 'react';

export default function LandingPage() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const LPtheme = createTheme(getLPTheme(mode));
  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <HomeNavbar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
