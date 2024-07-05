import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Home from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';

const drawerWidth = 240;

const items = [
  {
    key: '1',
    icon: <Home />,
    label: 'Домой',
    to: '/',
  },
  {
    key: '2',
    icon: <DescriptionIcon />,
    label: 'Посты',
    to: '/posts',
  },
];

const CustomLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {items.map((item) => (
              <ListItem key={item.key} component={Link} to={item.to}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, paddingTop: '64px' }}>
        <Box
          component="div"
          sx={{ padding: (theme) => theme.spacing(3), minHeight: '100vh' }}
        >
          <Outlet/> 
        </Box>
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{ pt: 4 }}
        >
          {new Date().getFullYear()} Created by Pavel Mikhaylov
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomLayout;
