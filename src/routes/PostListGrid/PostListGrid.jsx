import React, { useState, useEffect, useContext } from 'react';
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
  TextField,
} from '@mui/material';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';
import Accordion from '../../components/Accordion/Accordion';
import PostRating from '../../components/PostRating/PostRating';
import CreatePostModal from '../CreatePostModal/CreatePostModal';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { useAuth } from '../../hook';
import EditPostModal from '../EditPostModal/EditPostModal';
import CreateCommentModal from '../CreateCommentModal/CreateCommentModal';
import { AppContext } from '../../context/context';


const PostListGrid = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [editPostInitialValues, setEditPostInitialValues] = useState({});
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  
  const { posts, setPosts, onSearch } = useContext(AppContext);
  
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

  // const handleSearchChange = (event) => {
  //   const value = event.target.value;
  //   setSearch(value);
  // }

  const handleEditButtonClick = (post) => {
    setEditPostInitialValues(post);
    setIsEditModalVisible(true);
  };
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

  const handleEditPost = async (values) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/posts/${values.id}`,
        values
      );
      if (response.data && response.data.id) {
        setPosts(
          posts.map((post) =>
            post.id === response.data.id ? response.data : post
          )
        );
      } else {
        throw new Error('Неправильный формат ответа API');
      }
      setError(null);
    } catch (error) {
      setError('Не удалось создать пост');
    }
  };

  const setRatingForPost = (postId, newRate) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            rate: newRate,
          };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{ flexGrow: 1, paddingTop: '20px' }}>
      <Container>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Поиск постов"
          onChange={(e) => onSearch(e.target.value)}
          sx={{
            mb: 2,
          }}
        />
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
        <EditPostModal
          isModalVisible={isEditModalVisible}
          setIsModalVisible={setIsEditModalVisible}
          initialValues={editPostInitialValues}
          handleEditPost={handleEditPost}
        />
        <CreateCommentModal
          isModalVisible={isCommentModalVisible}
          setIsModalVisible={setIsCommentModalVisible}
        />
        <Grid container spacing={3}>
          {posts.map(({ id, title, body, url, rate }) => {
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
                  <PostRating
                    value={rate}
                    onChange={(newRate) => setRatingForPost(id, newRate)}
                  />
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
                      {body.length > 120 ? body.slice(0, 120) + '...' : body}
                    </Typography>
                  </CardContent>
                  <Accordion />
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <IconButton aria-label="share" size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>

                    <IconButton aria-label="buy" size="small">
                      <ShoppingCartIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(event) => handleDeletePost(event, id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        const postToEdit = posts.find((post) => post.id === id);
                        if (postToEdit) {
                          handleEditButtonClick(postToEdit);
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="add comment"
                      size="small"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsCommentModalVisible(true);
                      }}
                    >
                      <AddCommentIcon fontSize="small" />
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
