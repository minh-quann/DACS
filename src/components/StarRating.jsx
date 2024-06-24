import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import '../css/StarRating.css'

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className='star'>
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={`full-${i}`} icon={solidStar} />
      ))}
      {hasHalfStar && <FontAwesomeIcon icon={halfStar} />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={emptyStar} />
      ))}
    </div>
  );
};

export default StarRating;
