import React, { useEffect } from 'react';

const ListWithStyle = ({ style, count, onContent }) => {
  useEffect(() => {
    onContent(count);
  }, [count, onContent]);

  const listItems = Array.from({ length: count }, (_, i) => (
    <li key={i}> Item {i + 1}</li>
  ));

  return <ul style={style}>{listItems}</ul>;
};


export default ListWithStyle;
