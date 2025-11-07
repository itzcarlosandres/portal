
import React from 'react';
import { Software } from '../types';
import SoftwareCard from './SoftwareCard';

interface SoftwareListProps {
    softwareList: Software[];
    onSelect: (software: Software) => void;
}

const SoftwareList: React.FC<SoftwareListProps> = ({ softwareList, onSelect }) => {
    if (softwareList.length === 0) {
        return <div className="text-center py-16 text-slate-400">
            <h3 className="text-2xl font-bold mb-2 text-white">No applications found</h3>
            <p>Try adjusting your search or category filters.</p>
        </div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {softwareList.map(app => (
                <SoftwareCard key={app.id} software={app} onSelect={onSelect} />
            ))}
        </div>
    );
};

export default SoftwareList;
