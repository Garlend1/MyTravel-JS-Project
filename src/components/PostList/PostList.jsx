import React, { useEffect, useState } from 'react';
import { List, Card, Button } from 'antd';
import './PostList.css';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';

import CreatePostModal from '../PostModal/CreatePostModal';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleCreatePost = async (values) => {
    console.log(values);
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

  const handleDeletePost = async (postId) => {
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
    <div className="post-list-container">
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Создать пост
      </Button>
      <CreatePostModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleCreatePost={handleCreatePost}
      />
      {error && <div className="error-message"> Ошибка: {error}</div>}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 3,
        }}
        dataSource={posts}
        renderItem={(post, index) => (
          <List.Item key={index}>
            <Card
              cover={
                post.url && (
                  <img alt={post.title} src={post.url} className="post-image" />
                )
              }
              key={post.id}
              title={`${post.id}. ${post.title}`}
              actions={[
                <a key="delete" onClick={() => handleDeletePost(post.id)}>
                  Удалить
                </a>,
              ]}
            >
              <div className="post-body">{post.body}</div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PostList;
