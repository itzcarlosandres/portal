import React from 'react';
import { Software } from '../types';
import StarRating from './StarRating';
import IconRenderer from './IconRenderer';

interface SoftwareCardProps {
    software: Software;
    onSelect: (software: Software) => void;
}

const SoftwareCard: React.FC<SoftwareCardProps> = ({ software, onSelect }) => {
    return (
        <div 
            onClick={() => onSelect(software)}
            className="relative bg-slate-800/50 border border-slate-700/50 rounded-lg p-5 flex flex-col items-start gap-4 hover:bg-slate-700/50 hover:border-sky-500/50 transition-all duration-200 cursor-pointer group"
        >
            {(software.isFeatured || software.isSponsored) && (
                 <div className="absolute top-0 right-0 m-2 flex gap-1">
                    {software.isFeatured && <span className="text-xs font-bold bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full">Featured</span>}
                    {software.isSponsored && <span className="text-xs font-bold bg-purple-400/20 text-purple-300 px-2 py-1 rounded-full">Sponsored</span>}
                </div>
            )}
           
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconRenderer source={software.logo} className="w-7 h-7 text-sky-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">{software.name}</h3>
                    <p className="text-sm text-slate-400">{software.category}</p>
                </div>
            </div>
            <p className="text-sm text-slate-300 flex-grow">{software.description}</p>
            <div className="w-full flex justify-between items-center mt-2">
                <StarRating rating={software.rating} />
                <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-2 py-1 rounded">v{software.version}</span>
            </div>
        </div>
    );
};

export default SoftwareCard;
