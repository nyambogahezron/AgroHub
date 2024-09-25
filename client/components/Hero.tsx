import { alpha, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RxDashboard } from 'react-icons/rx';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <Box
      id='hero'
      sx={(theme) => ({
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : `#090E10`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: { lg: 'row', xs: 'column' },
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          marginTop: { xs: -0, lg: -15 },
        }}
        className='flex gap-5 items-center justify-center'
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' }, alignItems: 'center' }}
          className=' w-full items-start -mt-20 justify-center'
        >
          <Typography
            variant='h2'
            sx={{
              display: 'flex',
              marginTop: { xs: 8, md: 0 },
              alignSelf: 'start',
              textAlign: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(2rem, 10vw, 2.5rem)',
              fontWeight: 'bold',
            }}
          >
            <span>Agro</span> <span className='text-green-600'>Hub</span>
          </Typography>
          <Typography
            variant='h2'
            sx={{
              display: 'flex',
              alignSelf: 'start',
              textAlign: 'start',
              justifyContent: 'center',
              fontSize: 'clamp(1rem, 10vw, 1.5rem)',
              fontWeight: 'bold',
            }}
          >
            Empowering Farmers, Maximizing Profitability: Smart Solutions for
            Modern Agriculture
          </Typography>
          <Typography
            className='mt-10'
            color='text.secondary'
            sx={{ width: { sm: '100%', md: '80%' } }}
          >
            Track expenses, manage operations, and boost profitability with our
            smart agricultural platform. From farm inputs to sales, we provide
            data-driven insights, predictive analytics, and a marketplace to
            help farmers grow smarter and succeed.
          </Typography>

          <Stack className='hero-btn flex flex-row gap-4 mt-10 flex-wrap'>
            <Button
              sx={{ border: 1, borderColor: 'green' }}
              className='button py-3 px-4 items-center justify-center  bg-green-50 rounded-full capitalize text-black font-bold w-52 hover:bg-green-400 transition duration-500 ease-in-out'
            >
              Get Started
              <FaArrowRight className='ml-2 text-lg text-gray-700' />
            </Button>
            <Button className=' bg-green-100 rounded-lg capitalize py-3 px-8 text-blue-500 font-bold'>
              <RxDashboard className='mr-2 text-lg' />
              Dashboard
            </Button>
          </Stack>
        </Stack>
        <Box
          id='image'
          sx={(theme) => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: { xs: 200, sm: 700 },
            width: '100%',
            backgroundImage:
              theme.palette.mode === 'light'
                ? 'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")'
                : 'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
            backgroundSize: 'contain',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor:
              theme.palette.mode === 'light'
                ? alpha('#BFCCD9', 0.5)
                : alpha('#9CCCFC', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
                : ``,
          })}
        />
      </Container>
    </Box>
  );
}
