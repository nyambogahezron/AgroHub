import * as React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { accordionData } from '../../data';

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id='faq'
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
      <Typography
        component='h2'
        variant='h4'
        color='text.primary'
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        {accordionData.map((panel) => (
          <Accordion
            key={panel.id}
            expanded={expanded === panel.id}
            onChange={handleChange(panel.id)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${panel.id}d-content`}
              id={`${panel.id}d-header`}
            >
              <Typography component='h3' variant='subtitle2'>
                {panel.summary}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant='body2'
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' } }}
              >
                {panel.details}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
