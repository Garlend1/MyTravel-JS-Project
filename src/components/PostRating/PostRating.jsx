import React from 'react';
import { Rating } from '@mui/material';
import { Box } from '@mui/material';

const PostRating = ({ value }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
      }}
    >
      <Rating value={value}  />
    </Box>
  );
};

export default PostRating;
