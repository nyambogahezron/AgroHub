import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import { useState } from 'react';

const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Dashboard',
    description:
      'Get a real-time overview of your farm’s performance with key metrics on expenses, sales, and productivity all in one place.',
    imageLight:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
    imageDark:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
  },
  {
    icon: <AccessAlarmsIcon />,
    title: 'Expenses Tracking',
    description:
      'Easily record and monitor all farm input and labor costs to get a clear view of your spending and improve budget management.',
    imageLight:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
    imageDark:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
  },
  {
    icon: <AccountTreeIcon />,
    title: 'Products Sales Tracking',
    description:
      'Track your farm product sales, monitor inventory, and analyze trends to ensure profitability and meet market demands.',
    imageLight:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
    imageDark:
      'url("https://assets.justinmind.com/wp-content/uploads/2020/02/dahsboard-design-best-practices-example.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id='features' sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component='h2'
              variant='h4'
              color='text.primary'
              className='font-bold mb-2'
            >
              Features
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Effortlessly manage farm expenses and labor, track sales, and
              generate detailed reports. Leverage predictive analytics to
              optimize farming practices, and access our marketplace to connect
              with buyers, meet market standards, and attract investors among
              others features.
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: 'auto', sm: 'none' } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor:
                    selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant='outlined'
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color='text.primary'
                variant='body2'
                fontWeight='bold'
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color='text.secondary'
                variant='body2'
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
              <Link
                color='primary'
                variant='body2'
                fontWeight='bold'
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  '& > svg': { transition: '0.2s' },
                  '&:hover > svg': { transform: 'translateX(2px)' },
                }}
              >
                <span>Learn more</span>
                <ChevronRightRoundedIcon
                  fontSize='small'
                  sx={{ mt: '1px', ml: '2px' }}
                />
              </Link>
            </Box>
          </Box>
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='flex-start'
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant='outlined'
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200';
                    }
                    return selectedItemIndex === index
                      ? 'primary.dark'
                      : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: (theme) => {
                        if (theme.palette.mode === 'light') {
                          return selectedItemIndex === index
                            ? 'primary.main'
                            : 'grey.300';
                        }
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color='text.primary'
                      variant='body2'
                      fontWeight='bold'
                    >
                      {title}
                    </Typography>
                    <Typography
                      color='text.secondary'
                      variant='body2'
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color='primary'
                      variant='body2'
                      fontWeight='bold'
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>Learn more</span>
                      <ChevronRightRoundedIcon
                        fontSize='small'
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant='outlined'
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: (theme) =>
                  theme.palette.mode === 'light'
                    ? items[selectedItemIndex].imageLight
                    : items[selectedItemIndex].imageDark,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
