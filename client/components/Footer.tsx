import {
  Box,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';

const logoStyle = {
  width: '140px',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant='body2' color='text.secondary' mt={1}>
      {'Copyright © '}
      <Link href='#'>AgroHub&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <Box sx={{ ml: '-15px' }}>
              {/* <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              /> */}
            </Box>
            <Typography variant='body2' fontWeight={600} gutterBottom>
              Newsletter
            </Typography>
            <Typography variant='body2' color='text.secondary' mb={2}>
              Subscribe to our newsletter for weekly updates and promotions.
            </Typography>
            <Stack direction='row' spacing={1} useFlexGap>
              <TextField
                id='outlined-basic'
                hiddenLabel
                size='small'
                variant='outlined'
                fullWidth
                aria-label='Enter your email address'
                placeholder='Your email address'
                inputProps={{
                  autoComplete: 'off',
                  'aria-label': 'Enter your email address',
                }}
              />
              <Button
                variant='contained'
                color='primary'
                sx={{ flexShrink: 0 }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant='body2' fontWeight={600}>
            Product
          </Typography>
          <Link color='text.secondary' href='#features'>
            Features
          </Link>
          <Link color='text.secondary' href='#testimonials'>
            Testimonials
          </Link>
          <Link color='text.secondary' href='#highlights'>
            Highlights
          </Link>
          <Link color='text.secondary' href='#pricing'>
            Pricing
          </Link>
          <Link color='text.secondary' href='#FAQs'>
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant='body2' fontWeight={600}>
            Company
          </Typography>
          <Link color='text.secondary' href='#'>
            About us
          </Link>
          <Link color='text.secondary' href='#'>
            Careers
          </Link>
          <Link color='text.secondary' href='#'>
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant='body2' fontWeight={600}>
            Legal
          </Typography>
          <Link color='text.secondary' href='#'>
            Terms
          </Link>
          <Link color='text.secondary' href='#'>
            Privacy
          </Link>
          <Link color='text.secondary' href='#'>
            Contact
          </Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Link color='text.secondary' href='#'>
            Privacy Policy
          </Link>
          <Typography display='inline' sx={{ mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link color='text.secondary' href='#'>
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction='row'
          justifyContent='left'
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color='inherit'
            target='_blank'
            href='https://github.com/nyambogahezron'
            aria-label='GitHub'
            sx={{ alignSelf: 'center' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            color='inherit'
            target='_blank'
            href='https://x.com/nyambogahezron'
            aria-label='X'
            sx={{ alignSelf: 'center' }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            color='inherit'
            target='_blank'
            href='https://www.linkedin.com/in/nyambogahezron/'
            aria-label='LinkedIn'
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
