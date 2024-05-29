import React from 'react';
import './PostItem.css';
import { Button } from 'antd';

const PostItem = (props) => {
  return (
    <div className="post">
      <img
        src={props.post.url}
        alt={props.post.title}
        className="post__image"
      />
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}{' '}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
      <Button type="primary">Удалить</Button>
      </div>
    </div>
  );
};

export default PostItem;
