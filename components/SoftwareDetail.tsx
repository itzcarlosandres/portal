
import React from 'react';
import { Software, Review } from '../types';
import StarRating from './StarRating';
import IconRenderer from './IconRenderer';
import ReviewForm from './ReviewForm';

interface SoftwareDetailProps {
    software: Software;
    onBack: () => void;
    onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
    onDownload: () => void;
}

const SoftwareDetail: React.FC<SoftwareDetailProps> = ({ software, onBack, onAddReview, onDownload }) => {
    return (
        <div className="max-w-5xl mx-auto">
            <button onClick={onBack} className="mb-8 text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-2">
                &larr; Back to list
            </button>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 md:p-8">
                <header className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconRenderer source={software.logo} className="w-16 h-16 text-sky-400" />
                    </div>
                    <div className="flex-grow">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white">{software.name}</h1>
                        <p className="text-lg text-slate-400 mt-1">by {software.author}</p>
                        <div className="flex items-center gap-4 mt-4 flex-wrap">
                            <StarRating rating={software.rating} />
                            <span className="text-slate-400">({software.reviews.length} reviews)</span>
                            <span className="text-xs font-mono bg-slate-700 text-slate-300 px-2 py-1 rounded-full">{software.category}</span>
                        </div>
                    </div>
                    <div className="w-full md:w-auto text-center md:text-right mt-4 md:mt-0">
                         <a 
                            href={software.downloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={onDownload}
                            className="inline-block w-full md:w-auto bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                         >
                            Download Now
                        </a>
                        <p className="text-sm text-slate-500 mt-2">v{software.version} &bull; {software.downloads.toLocaleString()} downloads</p>
                    </div>
                </header>

                {software.screenshots && software.screenshots.length > 0 && (
                     <div className="mb-10">
                        <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Screenshots</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {software.screenshots.map((src, index) => (
                                <img key={index} src={src} alt={`${software.name} screenshot ${index + 1}`} className="rounded-lg border border-slate-700" />
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 prose prose-invert prose-slate max-w-none">
                        <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Description</h2>
                        {software.detailedDescription.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                    </div>
                    <aside>
                        <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 space-y-3">
                             <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-2">Details</h3>
                             <div><strong className="text-slate-400">Author:</strong> <span className="text-white">{software.author}</span></div>
                             <div><strong className="text-slate-400">License:</strong> <span className="text-white">{software.license}</span></div>
                             <div><strong className="text-slate-400">Platform:</strong> <span className="text-white">{software.platform}</span></div>
                             <div><strong className="text-slate-400">Requirements:</strong> <span className="text-white">{software.requirements}</span></div>
                             <div><strong className="text-slate-400">File Size:</strong> <span className="text-white">{software.size} {software.unit}</span></div>
                        </div>
                    </aside>
                </div>
               
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-white border-b border-slate-700 pb-2 mb-4">Reviews</h2>
                    <div className="space-y-6 mt-6">
                        {software.reviews.length > 0 ? (
                            software.reviews.slice().reverse().map(review => (
                                <div key={review.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-white">{review.author}</h4>
                                        <span className="text-xs text-slate-400">{review.date}</span>
                                    </div>
                                    <StarRating rating={review.rating} />
                                    <p className="text-slate-300 mt-2 whitespace-pre-wrap">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-slate-400 text-center py-4">No reviews yet. Be the first to leave one!</p>
                        )}
                    </div>
                     <ReviewForm onSubmit={onAddReview} />
                </div>
            </div>
        </div>
    );
};

export default SoftwareDetail;
