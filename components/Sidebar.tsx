import React from 'react';
import { DashboardIcon, AppsIcon, CategoryIcon } from './IconComponents';
import { AdminView } from './AdminPanel';

interface SidebarProps {
    currentView: AdminView;
    setCurrentView: (view: AdminView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
        { id: 'software', label: 'Software', icon: AppsIcon },
        { id: 'categories', label: 'Categories', icon: CategoryIcon },
    ];

    const baseClasses = "flex w-full items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-sky-500/10 text-sky-400";
    const inactiveClasses = "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200";

    return (
        <aside className="w-64 flex-shrink-0 bg-slate-800/50 border-r border-slate-700/50 p-4">
            <h2 className="text-lg font-semibold text-white px-2 mb-6">Admin Menu</h2>
            <nav className="space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentView(item.id as AdminView)}
                        className={`${baseClasses} ${currentView === item.id ? activeClasses : inactiveClasses}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
