import React, { useState } from 'react';
import { Category } from '../types';
import { TrashIcon, PlusIcon } from './IconComponents';

interface CategoryManagementProps {
    categories: Category[];
    onAddCategory: (category: Category) => boolean;
    onDeleteCategory: (category: Category) => void;
}

const CategoryManagement: React.FC<CategoryManagementProps> = ({ categories, onAddCategory, onDeleteCategory }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory) {
            const success = onAddCategory(newCategory);
            if(success) {
                setNewCategory('');
            } else {
                alert(`Category "${newCategory}" already exists.`);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Category Management</h1>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Add New Category</h2>
                <form onSubmit={handleAdd} className="flex items-center gap-4">
                    <input 
                        type="text" 
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="e.g., Finance"
                        className="flex-grow bg-slate-700 border border-slate-600 rounded-md text-slate-200 px-3 py-2" 
                        required 
                    />
                    <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700 transition-colors">
                        <PlusIcon className="w-5 h-5" />
                        Add Category
                    </button>
                </form>
            </div>

            <h2 className="text-xl font-bold text-white mb-4">Existing Categories</h2>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg">
                <ul className="divide-y divide-slate-700/50">
                    {categories.map(category => (
                        <li key={category} className="flex justify-between items-center p-4">
                            <span className="font-medium text-white">{category}</span>
                             <button onClick={() => onDeleteCategory(category)} className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryManagement;
