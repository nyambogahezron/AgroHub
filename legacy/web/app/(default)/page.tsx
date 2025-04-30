'use client';

import { CssBaseline, Box, Divider } from '@mui/material';
import HomeNavbar from '../../components/Navigation/Navbar';
import {
  Hero,
  Highlights,
  Pricing,
  Features,
  Testimonials,
  FAQ,
} from '../../components/pageSections';
import Footer from '../../components/pageSections/Footer';
import ThemeProviderWrapper from '@/components/ThemeProviderWrapper';

export default function LandingPage() {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <HomeNavbar />
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
    </ThemeProviderWrapper>
  );
}
