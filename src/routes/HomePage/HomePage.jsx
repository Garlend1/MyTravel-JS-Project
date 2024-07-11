import React from 'react';
import { Container, Typography, Button, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  background-color: #76ff03;
  &:hover {
    background-color: #64dd17;
  }
`;

const WelcomePage = () => {
  const navigate = useNavigate();
  const backgroundImageUrl =
    'https://images.wallpaperscraft.ru/image/single/gradient_zelenyj_tekstura_131365_1920x1080.jpg';
  const handleGoToPosts = () => {
    navigate('/posts');
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
        }}
      ></Box>
      <Container
        maxWidth="sm"
        sx={{
          textAlign: 'center',
          mt: 10,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom color={'white'}>
          Добро пожаловать!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color={'white'}>
          Исследуйте мир вокруг с помощью нашего приложения.
        </Typography>
        <Box mt={4}>
          <StyledButton
            sx={{
              backgroundColor: '#76ff03',
              '&:hover': { backgroundColor: '#64dd17' },
            }}
            variant="outlined"
            size="large"
            onClick={handleGoToPosts}
          >
            Начать
          </StyledButton>
        </Box>
      </Container>
    </>
  );
};

export default WelcomePage;
