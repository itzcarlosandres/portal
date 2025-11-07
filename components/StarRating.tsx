import React from 'react';
import { StarIcon } from './IconComponents';

interface StarRatingProps {
    rating: number;
    maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
    return (
        <div className="flex items-center gap-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <StarIcon
                        key={index}
                        className={`w-4 h-4 ${
                            starValue <= rating ? 'text-yellow-400' : 'text-slate-600'
                        }`}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
