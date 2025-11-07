
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
    categories: Category[];
    selectedCategory: Category | 'all';
    setSelectedCategory: (category: Category | 'all') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    const allCategories: (Category | 'all')[] = ['all', ...categories];

    return (
        <div className="flex justify-center flex-wrap gap-2 md:gap-3 mb-8">
            {allCategories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 ${
                        selectedCategory === category
                            ? 'bg-sky-600 text-white shadow-lg'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                >
                    {category === 'all' ? 'All Categories' : category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
