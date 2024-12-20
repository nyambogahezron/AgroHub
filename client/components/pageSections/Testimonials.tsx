import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Box,
  Container,
  Grid,
} from '@mui/material';

const userTestimonials = [
  {
    avatar: <Avatar alt='Sarah Johnson' src='/static/images/avatar/1.jpg' />,
    name: 'Sarah Johnson',
    occupation: 'Farm Owner',
    testimonial:
      'This platform has transformed how I manage my farm. The expense tracking and sales reporting tools give me the insights I need to make smarter decisions and maximize my profits.',
  },
  {
    avatar: <Avatar alt='David Green' src='/static/images/avatar/2.jpg' />,
    name: 'David Green',
    occupation: 'Agricultural Consultant',
    testimonial:
      'The predictive analytics feature is a game changer for farmers. It helps my clients optimize their operations based on accurate data, making their farms more efficient and profitable.',
  },
  {
    avatar: <Avatar alt='Linda Carter' src='/static/images/avatar/3.jpg' />,
    name: 'Linda Carter',
    occupation: 'Marketplace Seller',
    testimonial:
      'The integrated marketplace feature makes it easy for me to sell my products and connect with buyers. I love how it helps me stay competitive by providing market trends and pricing insights.',
  },
];

export default function Testimonials() {
  return (
    <Container
      id='testimonials'
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography component='h2' variant='h4' color='text.primary'>
          Testimonials
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          See what our customers love about our products. Discover how we excel
          in efficiency, durability, and satisfaction. Join us for quality,
          innovation, and reliable support.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
