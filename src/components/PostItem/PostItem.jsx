import React from 'react';
import './PostItem.css';
import { Button } from 'antd';

const PostItem = ({post, onDelete }) => {
  return (
    <div className="post">
      <img
        src={post.url}
        alt={post.title}
        className="post__image"
      />
      <div className="post__content">
        <strong>
          {post.id}. {post.title}{' '}
        </strong>
        <div>{post.body}</div>
      </div>

      <div className="post__btns">
        <Button type="primary" onClick={() => onDelete(post.id)}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default PostItem;
