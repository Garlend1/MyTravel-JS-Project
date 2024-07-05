import { Container, Typography } from '@mui/material';
import React from 'react';
import { photoMap } from '../../constants';
import { useParams } from 'react-router-dom';

const Photo = () => {
  const { id } = useParams();
  return (
    <Container maxWidth="md">
      <Typography variant="h4">Переданный параметр: {id}</Typography>
      <br/>
      <Typography variant='h5'>
        Тематика фотографии: {photoMap[id]}
      </Typography>
    </Container>
  );
};

export default Photo;
