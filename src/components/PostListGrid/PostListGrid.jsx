import React, { useState, useEffect } from 'react';
import styles from './PostListGrid.module.css';
import {
  Button,
  Box,
  Container,
  Card,
  Grid,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';
import Accordion from '../Accordion/Accordion';
import PostRating from '../PostRating/PostRating';



const PostListGrid = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/posts`);
      if (response.statusText !== 'OK') {
        throw new Error('Не удалось получить данные с сервера');
      }
      setPosts(response.data.posts);
      setError(null);
    } catch (error) {
      setError('Не удалось получить данные с сервера');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '20px' }}>
      <Container>
        <Grid container spacing={3}>
          {posts.map((e) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={e.id}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 345,
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <PostRating/>
                  <CardMedia
                    sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                    image={e.url}
                    title="green iguana"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {e.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {e.body.length > 120
                        ? e.body.slice(0, 120) + '...'
                        : e.body}
                    </Typography>
                  </CardContent>
                  <Accordion />
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small">Поделиться</Button>
                    <Button size="small">Заказать</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default PostListGrid;
