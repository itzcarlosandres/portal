
import React, { useState, useMemo } from 'react';
import { Software, Category, Review, Author, Platform, License, Requirement } from './types';
import { initialSoftware, initialCategories, initialAuthors, initialPlatforms, initialLicenses, initialRequirements } from './data/software';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SoftwareList from './components/SoftwareList';
import SoftwareDetail from './components/SoftwareDetail';
import AdminPanel from './components/AdminPanel';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
    // State initialization using the custom useLocalStorage hook
    const [softwareList, setSoftwareList] = useLocalStorage<Software[]>('softwareList', initialSoftware);
    const [categories, setCategories] = useLocalStorage<Category[]>('categories', initialCategories);
    const [authors, setAuthors] = useLocalStorage<Author[]>('authors', initialAuthors);
    const [platforms, setPlatforms] = useLocalStorage<Platform[]>('platforms', initialPlatforms);
    const [licenses, setLicenses] = useLocalStorage<License[]>('licenses', initialLicenses);
    const [requirements, setRequirements] = useLocalStorage<Requirement[]>('requirements', initialRequirements);

    const [selectedSoftware, setSelectedSoftware] = useState<Software | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
    const [isAdminView, setIsAdminView] = useState(false);

    const filteredSoftware = useMemo(() => {
        return softwareList.filter(app => {
            const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
            const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [softwareList, searchTerm, selectedCategory]);
    
    const handleSelectSoftware = (software: Software) => {
        setSelectedSoftware(software);
    };

    const handleBackToList = () => {
        setSelectedSoftware(null);
    };
    
    const handleToggleAdminView = () => {
        setIsAdminView(!isAdminView);
        setSelectedSoftware(null); // Reset view when toggling
    };
    
    const handleAddOrUpdateSoftware = (softwareData: Software) => {
        setSoftwareList(prevList => {
            const existingIndex = prevList.findIndex(s => s.id === softwareData.id);
            if (existingIndex > -1) {
                const newList = [...prevList];
                newList[existingIndex] = softwareData;
                return newList;
            }
            return [...prevList, softwareData];
        });
    };
    
    const handleDeleteSoftware = (id: string) => {
        setSoftwareList(prev => prev.filter(app => app.id !== id));
    };
    
    const handleAddCategory = (newCategory: Category) => {
        if (!categories.find(c => c.toLowerCase() === newCategory.toLowerCase())) {
            setCategories(prev => [...prev, newCategory]);
            return true;
        }
        return false;
    };
    
    const handleDeleteCategory = (categoryToDelete: Category) => {
        setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
        setSoftwareList(prev => prev.map(app => app.category === categoryToDelete ? { ...app, category: 'Uncategorized' } : app));
    };

    const handleAddAuthor = (newAuthor: Author) => {
        if (!authors.find(a => a.toLowerCase() === newAuthor.toLowerCase())) {
            setAuthors(prev => [...prev, newAuthor]);
            return true;
        }
        return false;
    };

    const handleAddReview = (softwareId: string, review: Omit<Review, 'id' | 'date'>) => {
        const updateSoftware = (s: Software) => {
            if (s.id === softwareId) {
                const newReview: Review = {
                    ...review,
                    id: String(Date.now()),
                    date: new Date().toISOString().split('T')[0],
                };
                const updatedReviews = [...s.reviews, newReview];
                const newRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
                return { ...s, reviews: updatedReviews, rating: parseFloat(newRating.toFixed(1)) };
            }
            return s;
        }
        setSoftwareList(prevList => prevList.map(updateSoftware));
        if (selectedSoftware && selectedSoftware.id === softwareId) {
            setSelectedSoftware(updateSoftware(selectedSoftware));
        }
    };
    
    const handleDownload = (softwareId: string) => {
        const updateSoftwareDownloads = (s: Software): Software => {
            if (s.id === softwareId) {
                return { ...s, downloads: s.downloads + 1 };
            }
            return s;
        };

        setSoftwareList(prevList => prevList.map(updateSoftwareDownloads));

        if (selectedSoftware && selectedSoftware.id === softwareId) {
            setSelectedSoftware(prev => prev ? { ...prev, downloads: prev.downloads + 1 } : null);
        }
    };
    
    const handleResetData = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
            <Header onToggleAdmin={handleToggleAdminView} isAdminView={isAdminView} />
            <main className="container mx-auto px-4 py-8">
                {isAdminView ? (
                    <AdminPanel 
                        softwareList={softwareList}
                        categories={categories}
                        authors={authors}
                        platforms={platforms}
                        licenses={licenses}
                        requirements={requirements}
                        onSaveSoftware={handleAddOrUpdateSoftware}
                        onDeleteSoftware={handleDeleteSoftware}
                        onAddCategory={handleAddCategory}
                        onDeleteCategory={handleDeleteCategory}
                        onAddAuthor={handleAddAuthor}
                    />
                ) : selectedSoftware ? (
                    <SoftwareDetail 
                        software={selectedSoftware} 
                        onBack={handleBackToList}
                        onAddReview={(review) => handleAddReview(selectedSoftware.id, review)}
                        onDownload={() => handleDownload(selectedSoftware.id)}
                    />
                ) : (
                    <>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Welcome to Gemini Soft-Portal</h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Discover, rate, and manage the best software tools, powered by AI.</p>
                        </div>
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <div className="mt-8 mb-10">
                           <CategoryFilter categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                        </div>
                        <SoftwareList softwareList={filteredSoftware} onSelect={handleSelectSoftware} />
                    </>
                )}
            </main>
            <footer className="text-center py-4 border-t border-slate-800">
                <button onClick={handleResetData} className="text-sm text-slate-500 hover:text-red-500 transition-colors">
                    Reset to Default Data
                </button>
            </footer>
        </div>
    );
};

export default App;
