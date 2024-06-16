import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MockAccordion = () => {
  const mockData = {
    content:
      'Содержимое аккордеона. Здесь может быть ваш текст, который можно расширить или скрыть.',
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Подробнее о туре
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{mockData.content}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default MockAccordion;
