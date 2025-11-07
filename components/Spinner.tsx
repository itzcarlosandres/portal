
import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 border-4 border-t-sky-500 border-r-sky-500/30 border-b-sky-500/30 border-l-sky-500/30 rounded-full animate-spin"></div>
            <p className="text-slate-300 font-semibold">Generating AI Content...</p>
        </div>
    );
};

export default Spinner;
