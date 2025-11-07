import React, { useState } from 'react';
import { Review } from '../types';

interface ReviewFormProps {
    onSubmit: (review: Omit<Review, 'id' | 'date'>) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (author && rating > 0 && comment) {
            onSubmit({ author, rating, comment });
            setAuthor('');
            setRating(0);
            setComment('');
        } else {
            alert('Please fill out all fields and provide a rating.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Leave a Review</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2"
                        required
                    />
                </div>
                <div>
                     <label className="block text-sm font-medium text-slate-300 mb-2">Your Rating</label>
                    <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <button type="button" key={starValue} onClick={() => setRating(starValue)} className="text-2xl cursor-pointer transition-transform hover:scale-125">
                                    <span className={starValue <= rating ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-400/50'}>★</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-slate-300 mb-1">Your Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2"
                        required
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                        Submit Review
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ReviewForm;
