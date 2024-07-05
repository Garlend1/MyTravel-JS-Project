import { Box, Button, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook';

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth()

  const form = location.state?.from?.pathname || '/';
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');

    auth.signin(username, () => {
      navigate(form, { replace: true });
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <Typography variant="h2">Страница авторизации</Typography>
      <Box component="form" display="flex" my={3} onSubmit={handleSubmit}>
        <TextField
          autoFocus
          required
          name="username"
          label="Введите логин"
          variant="outlined"
        />
        <Button variant="outlined" color="success">
          Авторизоваться
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
