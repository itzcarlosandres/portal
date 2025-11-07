import React from 'react';
import { AppsIcon, CategoryIcon } from './IconComponents';

interface AdminDashboardProps {
    softwareCount: number;
    categoryCount: number;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string; color: string }> = ({ icon, label, value, color }) => (
    <div className={`bg-slate-800 p-6 rounded-lg border border-slate-700/50 flex items-center gap-5`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-slate-400">{label}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ softwareCount, categoryCount }) => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <StatCard 
                    icon={<AppsIcon className="w-6 h-6 text-white"/>} 
                    label="Total Software" 
                    value={softwareCount} 
                    color="bg-sky-500/50"
                />
                 <StatCard 
                    icon={<CategoryIcon className="w-6 h-6 text-white"/>}
                    label="Total Categories"
                    value={categoryCount}
                    color="bg-teal-500/50"
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
