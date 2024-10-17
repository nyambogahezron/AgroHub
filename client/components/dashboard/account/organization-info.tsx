'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CreateOrganizationModel from '@/components/CreateOrganizationModel';
import { Box, Grid } from '@mui/material';
import { useGlobalContext } from '@/context/GlobalProvider';

export default function OrganizationInfo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { currentOrganization, organization } = useGlobalContext();
  return (
    <Grid item xs={12} md={6}>
      <Card className='px-2'>
        <Typography variant='h6' className='ml-4 mt-2'>
          Organization Information
        </Typography>

        <CardContent className='flex flex-col gap-2 h-[120px] overflow-y-auto custom-scrollbar'>
          {organization &&
            organization.map((org: any) => {
              return (
                <Box
                  key={org.id}
                  className={`flex flex-row items-center gap-4 `}
                >
                  <Box
                    className={`flex items-center justify-center border-2 border-gray-100 p-2 px-3 rounded-lg ${
                      currentOrganization?.id === org.id
                        ? 'border-green-500'
                        : ''
                    }`}
                  >
                    {org.name[0]}
                  </Box>
                  <Box>
                    <Typography>{org.name}</Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {org.email}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
        </CardContent>
        <Divider />
        <CardActions>
          <Button fullWidth variant='text' onClick={() => handleOpen()}>
            Create Organization
          </Button>
        </CardActions>
        <CreateOrganizationModel open={open} handleClose={handleClose} />
      </Card>
    </Grid>
  );
}
