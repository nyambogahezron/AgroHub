import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Comprehensive Farm Management',
    description:
      'Efficiently track expenses, labor costs, and sales to get a clear overview of your farm operations in real-time.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Built for Scalability',
    description:
      'Designed to grow with your farm, our platform handles the needs of small to large-scale farming operations.',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'User-Friendly Interface',
    description:
      'Our intuitive interface makes it easy for farmers to manage their farms with minimal learning curve.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Advanced Predictive Analytics',
    description:
      'Leverage powerful analytics to forecast trends, optimize resources, and improve profitability with data-driven insights.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Dedicated Support',
    description:
      'Get reliable customer support with quick responses to help you maximize the platform’s benefits.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Accurate Reporting',
    description:
      'Generate detailed reports on farm expenses, sales, and productivity to make informed decisions for better results.',
  },
];

export default function Highlights() {
  return (
    <Box
      id='highlights'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component='h2' variant='h4' className='mb-4'>
            Highlights
          </Typography>
          <Typography variant='body1' sx={{ color: 'grey.400' }}>
            Our platform stands out with its adaptability, durability, and
            user-friendly design. Built for efficient farm management, it offers
            innovative features like predictive analytics and detailed
            reporting. Enjoy reliable support and precision in every detail for
            a seamless experience.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction='column'
                color='inherit'
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight='medium' gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
