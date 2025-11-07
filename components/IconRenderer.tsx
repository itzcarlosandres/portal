import React from 'react';
import { iconMap } from '../data/icons';
import { AppsIcon } from './IconComponents';

interface IconRendererProps {
    source: string; // Can be iconName or base64 string
    className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ source, className }) => {
    if (source.startsWith('data:image')) {
        return <img src={source} alt="logo" className={className} />;
    }
    
    const IconComponent = iconMap[source];

    if (!IconComponent) {
        // Return a default icon if the icon name is not found
        return <AppsIcon className={className} />;
    }

    return <IconComponent className={className} />;
};

export default IconRenderer;
