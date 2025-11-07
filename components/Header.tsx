import React from 'react';

interface HeaderProps {
    onToggleAdmin: () => void;
    isAdminView: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleAdmin, isAdminView }) => {
    return (
        <header className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-sky-600 rounded-lg"></div>
                    <span className="text-xl font-bold text-white">Gemini Soft-Portal</span>
                </div>
                <button
                    onClick={onToggleAdmin}
                    className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                        isAdminView
                            ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                            : 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500'
                    }`}
                >
                    {isAdminView ? 'Back to App' : 'Admin Panel'}
                </button>
            </div>
        </header>
    );
};

export default Header;