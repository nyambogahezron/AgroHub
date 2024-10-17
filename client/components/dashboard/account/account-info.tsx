'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Grid } from '@mui/material';

export default function AccountInfo() {
  const { session } = useGlobalContext();
  return (
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <div>
              {session?.avatar ? (
                <Avatar
                  src={session?.avatar}
                  alt={session?.name}
                  sx={{ width: 100, height: 100 }}
                />
              ) : (
                <Avatar sx={{ width: 80, height: 80 }}>
                  {session?.name[0]}
                </Avatar>
              )}
            </div>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant='h5'>{session?.name}</Typography>
              <Typography variant='body2' color='textSecondary'>
                {session?.email}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        {!session?.avatar && (
          <CardActions>
            <Button fullWidth variant='text'>
              Upload picture
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
