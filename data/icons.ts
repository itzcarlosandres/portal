
import React from 'react';
import {
    AppsIcon,
    CategoryIcon,
    DashboardIcon,
    SearchIcon,
    PlusIcon,
    TrashIcon,
    CodePilotIcon,
    FirewallIcon,
} from '../components/IconComponents';

export const iconMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
    CodePilotIcon,
    FirewallIcon,
    AppsIcon,
    CategoryIcon,
    DashboardIcon,
    SearchIcon,
    PlusIcon,
    TrashIcon,
    // Add other icons to the map
};
