// import React, { useEffect, useState } from 'react';
// import PostItem from '../PostItem/PostItem';
// import './PostList.css';
// import { BACKEND_URL } from '../../constants';
// import axios from 'axios';

// const PostList = () => {
//   const [posts, setPosts] = useState([])
//   const [error, setError] = useState(null)

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}/api/posts`);
//         console.log(response.data.posts);
//         if (response.statusText !== 'OK') {
//           throw new Error('Не удалось получить данные с сервера');
//         }
//         setPosts(response.data.posts);
//         setError(null);
//       } catch (error) {
//         setError('Не удалось получить данные с сервера');
//     }
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const handleDeletePost =  async (postId) => {
//     try {
//       const response = await axios.delete(`${BACKEND_URL}/api/posts/${postId}`);
//       if (response.statusText !== 'No Content') {
//         throw new Error('Не удалось удалить пост');
//       }
//       setPosts(posts.filter((post) => post.id !== postId));
//       setError(null);
//     } catch (error) {
//       setError('Не удалось удалить пост');
//     }
//   };

//   return (
//     <div className="post-list-container">
//       {error && <div className='error-message'> Ошибка: {error}</div>}
//       <div className='post-list'>
//       {posts.map((post) => (
//         <PostItem post={post} key={post.id} onDelete = {handleDeletePost} />
//       ))}
//     </div>
//     </div>
//   );
// };

// export default PostList;

import React, { useEffect, useState } from 'react';
import { List, Card } from 'antd';
import './PostList.css';
import { BACKEND_URL } from '../../constants';
import axios from 'axios';

const PostList = () => {
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
          <List.Item>
            <Card
              cover={
                post.url && (
                  <img alt="example" src={post.url} className="post-image" />
                )
              }
              key={post.id}
              title={`${post.id}. ${post.title}}`}
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
