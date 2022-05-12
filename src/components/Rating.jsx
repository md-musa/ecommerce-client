import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function Rating({ rating }) {
  return (
    <div className="text-yellow-500">
      {new Array(Math.floor(rating)).fill(0).map((_, index) => (
        <StarIcon key={index} />
      ))}
      {rating % 2 > 0 && <StarHalfIcon />}
      {rating < 4 &&
        new Array(5 - Math.ceil(rating)).fill(0).map(_ => <StarOutlineIcon />)}
    </div>
  );
}

export default Rating;
