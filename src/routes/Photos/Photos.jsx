import { Stack, List, ListItem, styled } from '@mui/material';
import { photos } from '../../constants';
import { Link, Outlet } from 'react-router-dom';


const ListStyled = styled(List)(({ theme }) => ({
  width: 240,
  height: '100vh',
}));
const Photos = () => {
  return (
    <Stack flexDirection={'row'}>
      <ListStyled elevation={3}>
        <List>
          {photos.map(({ id, title, path }, index) => (
            <ListItem key={id}>
              <Link to={path}>
                <span>{index + 1}. </span>
                {title}
              </Link>
            </ListItem>
          ))}
        </List>
      </ListStyled>
      <Outlet />
    </Stack>
  );
};

export default Photos;
