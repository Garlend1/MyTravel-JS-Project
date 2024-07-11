import React from 'react';
import { Rating } from '@mui/material';
import { Box } from '@mui/material';

const PostRating = ({ value, onChange }) => {

  const handleRatingChange = (event, newValue) => {
    event.stopPropagation();
    onChange(newValue);
  }
  return (
    <Box onClick={handleRatingChange}
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
      }}
    >
      <Rating value={value} precision={1} onChange={handleRatingChange}  />
    </Box>
  );
};

export default PostRating;
