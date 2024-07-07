import React, { useState, useEffect } from 'react';
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
import Accordion from '../../components/Accordion/Accordion';
import PostRating from '../../components/PostRating/PostRating';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useAuth } from '../../hook';

const PostListGrid = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 8;
  const navigate = useNavigate();
  const auth = useAuth();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/posts?page=${page}&limit=${postsPerPage}`
      );
      if (response.statusText !== 'OK') {
        throw new Error('Не удалось получить данные с сервера');
      }
      setPosts(response.data.posts);
      setTotalPosts(response.data.totalPosts);
      setError(null);
    } catch (error) {
      setError('Не удалось получить данные с сервера');
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleCardClick = (postId) => {
    navigate(`/posts/${postId}`);
  };
  const handleCreatePost = async (values) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/posts`, values);
      if (response.data && response.data.id) {
        setPosts([response.data, ...posts]);
      } else {
        throw new Error('Неправильный формат ответа API');
      }
      setError(null);
    } catch (error) {
      setError('Не удалось создать пост');
    }
  };

  const handleDeletePost = async (event, postId) => {
    event.stopPropagation();
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/posts/${postId}`);
      if (response.statusText !== 'No Content') {
        throw new Error('Не удалось удалить пост');
      }
      setPosts(posts.filter((post) => post.id !== postId));
      setError(null);
    } catch (error) {
      setError('Не удалось удалить пост');
    }
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '20px' }}>
      <Container>
        {auth.user ? (
          <Button
            variant="contained"
            sx={{
              m: 4,
              p: 1,
              backgroundColor: '#155263',
            }}
            onClick={() => setIsModalVisible(true)}
          >
            Добавить пост
          </Button>
        ) : (
          <></>
        )}
        <CreatePostModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleCreatePost={handleCreatePost}
        />
        <Grid container spacing={3}>
          {posts.map(({id, title, body, url}) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Card
                  onClick={() => handleCardClick(id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 345,
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <PostRating />
                  <CardMedia
                    sx={{ height: 200, width: '100%', objectFit: 'cover' }}
                    image={url}
                    title={title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {body.length > 120
                        ? body.slice(0, 120) + '...'
                        : body}
                    </Typography>
                  </CardContent>
                  <Accordion />
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button size="small">Поделиться</Button>
                    <Button size="small">Заказать</Button>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(event) => handleDeletePost(event, id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Pagination
          sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
          count={15}
          page={page}
          onChange={(event, value) => {
            setPage(value);
            fetchData(value);
          }}
          shape="rounded"
        />
      </Container>
    </Box>
  );
};

export default PostListGrid;
