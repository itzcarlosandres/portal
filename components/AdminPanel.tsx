import React, { useState } from 'react';
import { Software, Category, Author, Platform, License, Requirement } from '../types';
import Sidebar from './Sidebar';
import AdminDashboard from './AdminDashboard';
import SoftwareManagement from './SoftwareManagement';
import CategoryManagement from './CategoryManagement';

export type AdminView = 'dashboard' | 'software' | 'categories';

interface AdminPanelProps {
    softwareList: Software[];
    categories: Category[];
    authors: Author[];
    platforms: Platform[];
    licenses: License[];
    requirements: Requirement[];
    onSaveSoftware: (software: Software) => void;
    onDeleteSoftware: (id: string) => void;
    onAddCategory: (category: Category) => boolean;
    onDeleteCategory: (category: Category) => void;
    onAddAuthor: (author: Author) => boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
    const { softwareList, categories } = props;
    const [currentView, setCurrentView] = useState<AdminView>('software');

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <AdminDashboard softwareCount={softwareList.length} categoryCount={categories.length} />;
            case 'software':
                return <SoftwareManagement {...props} />;
            case 'categories':
                return <CategoryManagement 
                    categories={categories} 
                    onAddCategory={props.onAddCategory}
                    onDeleteCategory={props.onDeleteCategory}
                />;
            default:
                return <AdminDashboard softwareCount={softwareList.length} categoryCount={categories.length} />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* FIX: Corrected typo from currentViev to currentView. */}
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <main className="flex-grow w-full">
                {renderView()}
            </main>
        </div>
    );
};

export default AdminPanel;