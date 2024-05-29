import React from 'react';
import PostItem from '../PostItem/PostItem';
import data from '../../data.json';
import './PostList.css';

const PostList = ({ posts, title }) => {
  return (
    <div className="post-list">
      {data.posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
