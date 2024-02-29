import clsx from 'clsx';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number>(0);
  return (
    <div className='flex items-center justify-between space-x-4'>
      <div className='flex'>
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={index} className='cursor-pointer'>
              <input className='hidden' type='radio' name='rating' value={currentRating} onClick={() => setRating(currentRating)} />
              <FaStar
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
                className={clsx(rating && currentRating <= (hover || rating) ? 'text-yellow-300' : 'text-wl-gray-3')}
                size={20}
              />
            </label>
          );
        })}
      </div>
      {rating && <p className='text-xs font-bold text-gray-500'>{rating} starts</p>}
    </div>
  );
};

Rating.propTypes = {};

export default Rating;
