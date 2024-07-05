import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import PostRating from '../../components/PostRating/PostRating';
import Accordion from '../../components/Accordion/Accordion';
import DeleteIcon from '@mui/icons-material/Delete';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const fetchPost = async () => {

    try {
      const response = await axios.get(`${BACKEND_URL}/api/posts/${id}`);
      if (response.status !== 200) {
        throw new Error('Не удалось получить данные о посте');
      }
      setPost(response.data);
      setError(null);
    } catch (error) {
      setError('Не удалось получить данные о посте');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  if (!post) {
    return <Typography variant="body1">Загрузка...</Typography>;
  }

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '20px' }}>
      <Container>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 600,
            margin: 'auto',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <PostRating />
          <CardMedia
            sx={{ height: 400, width: '100%', objectFit: 'cover' }}
            image={post.url}
            title={post.title}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h4" component="div">
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {post.body}
            </Typography>
          </CardContent>
          <Accordion />
          <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small">Поделиться</Button>
                    <Button size="small">Заказать</Button>
                    <IconButton
                      aria-label="delete"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default PostDetailPage;