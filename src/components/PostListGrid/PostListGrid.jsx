import React, { useState, useEffect } from 'react';
import styles from './PostListGrid.module.css';
import {
  Button,
  Box,
  Container,
  Card,
  Grid,
  Typography,
  Link,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';

const PostListGrid = () => {
  const [posts, setPosts] = useState([]); // Используем useState для хранения постов
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
              <Grid item xs={4} sm={4} md={4}>
                <Card sx={{ maxWidth: 345, height: 420, overflow: 'hidden' }}>
                  
                  <CardMedia
                    sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                    image={e.url}
                    title="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.title}
                  </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {e.body.length > 150
                        ? e.body.slice(0, 150) + '...'
                        : e.body}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
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
