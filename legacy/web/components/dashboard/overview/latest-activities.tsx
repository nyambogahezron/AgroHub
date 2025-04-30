import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import dayjs from 'dayjs';

export interface Product {
  id: string;
  image: string;
  name: string;
  updatedAt: Date;
}

export interface LatestProductsProps {
  products?: Product[];
  sx?: SxProps;
}

export interface Activity {
  id: string;
  description: string;
  timestamp: Date;
}

const dummyActivities: Activity[] = [
  { id: '1', description: 'User A added a new product', timestamp: new Date() },
  {
    id: '2',
    description: 'User B updated product details',
    timestamp: new Date(),
  },
  { id: '3', description: 'User C deleted a product', timestamp: new Date() },
  { id: '4', description: 'User D added a review', timestamp: new Date() },
];

export default function LatestActivities(): React.JSX.Element {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title='Latest activities' />
      <Divider />
      <List>
        {dummyActivities.map((activity, index) => (
          <ListItem
            divider={index < dummyActivities.length - 1}
            key={activity.id}
          >
            <ListItemText
              primary={activity.description}
              primaryTypographyProps={{ variant: 'subtitle1' }}
              secondary={`At ${dayjs(activity.timestamp).format(
                'MMM D, YYYY h:mm A'
              )}`}
              secondaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color='inherit'
          endIcon={<ArrowRightIcon fontSize='var(--icon-fontSize-md)' />}
          size='small'
          variant='text'
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
