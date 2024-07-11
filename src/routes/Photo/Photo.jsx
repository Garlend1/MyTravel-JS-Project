import { Container, Typography, Button } from '@mui/material';
import React from 'react';
import { photoMap } from '../../constants';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ArrowBack } from '@mui/icons-material';

const Photo = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  return (
    <Container maxWidth="md">
      <Button sx={{ mb: 2 }}
        startIcon={<ArrowBack />}
        size="medium"
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
      <Typography variant="h4">Переданный параметр: {id}</Typography>
      <br />
      <Typography variant="h5">Тематика фотографии: {photoMap[id]}</Typography>
    </Container>
  );
};

export default Photo;
