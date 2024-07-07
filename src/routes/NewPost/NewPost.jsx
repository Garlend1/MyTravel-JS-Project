import React from 'react';
import CreatePostModal from '../PostModal/CreatePostModal';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useState } from 'react';

const NewPost = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <>
      <CreatePostModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleCreatePost={handleCreatePost}
      />
    </>
  );
};

export default NewPost;
