import React, { useState, useEffect, useRef } from 'react';
import styles from './AboutPosts.module.css';

const AboutPosts = ({ inputValue, userId }) => {
  const [posts, setPosts] = useState([]);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const fetchPosts = async () => {
      if (inputValue !== 'posts') return;

      const timeoutId = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}/posts`
          );

          if (!response.ok) {
            throw new Error('Не удалось получить посты');
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.log(error);
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    };

    fetchPosts();
  }, [inputValue, userId]);

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <p>Количество рендеров: {renderCount.current}</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPosts;
