import { Software, Category, Author, Platform, License, Requirement } from '../types';

export const initialCategories: Category[] = [
    'Productivity',
    'Developer Tools',
    'Security',
    'Design',
    'Utilities',
    'Uncategorized',
];

export const initialAuthors: Author[] = ['DevGenius Inc.', 'SecureSys', 'CreativeMinds LLC'];
export const initialPlatforms: Platform[] = ['Windows', 'macOS', 'Linux', 'Cross-Platform'];
export const initialLicenses: License[] = ['Freeware', 'Proprietary', 'Open Source (MIT)', 'Subscription'];
export const initialRequirements: Requirement[] = ['Windows 10+', 'macOS 11+', '64-bit Processor'];


export const initialSoftware: Software[] = [
    {
        id: '1',
        name: 'Code-Pilot',
        slug: 'code-pilot',
        logo: 'CodePilotIcon',
        screenshots: [],
        category: 'Developer Tools',
        description: 'AI-powered code completion and suggestion tool for developers.',
        detailedDescription: 'Code-Pilot is an advanced AI assistant designed to streamline your coding workflow. It provides intelligent, context-aware code completions, suggests best practices, and helps you write cleaner, more efficient code faster than ever before. Integrated directly into your favorite IDE, Code-Pilot understands your project\'s context to offer relevant suggestions, from simple variable names to complex function implementations.',
        rating: 4.8,
        version: '2.1.0',
        reviews: [
            { id: 'r1', author: 'Jane Doe', rating: 5, comment: 'Absolutely indispensable for my daily work!', date: '2023-10-26' },
            { id: 'r2', author: 'John Smith', rating: 4, comment: 'Great tool, though sometimes the suggestions are a bit off.', date: '2023-10-22' },
        ],
        downloads: 150234,
        size: 120,
        unit: 'MB',
        downloadUrl: '#',
        author: 'DevGenius Inc.',
        platform: 'Cross-Platform',
        license: 'Subscription',
        requirements: '64-bit Processor',
        isFeatured: true,
    },
    {
        id: '2',
        name: 'Firewall Pro X',
        slug: 'firewall-pro-x',
        logo: 'FirewallIcon',
        screenshots: [],
        category: 'Security',
        description: 'Advanced network security and threat protection for your system.',
        detailedDescription: 'Firewall Pro X offers comprehensive, next-generation protection against all forms of cyber threats. It actively monitors your network traffic, blocking malicious connections, preventing intrusions, and safeguarding your private data from hackers and malware. With its intuitive interface, you can easily configure security rules and monitor activity in real-time.',
        rating: 4.5,
        version: '5.3.2',
        reviews: [
            { id: 'r3', author: 'Alex Johnson', rating: 5, comment: 'The best firewall I have ever used. Simple and powerful.', date: '2023-09-15' },
        ],
        downloads: 520100,
        size: 85,
        unit: 'MB',
        downloadUrl: '#',
        author: 'SecureSys',
        platform: 'Windows',
        license: 'Proprietary',
        requirements: 'Windows 10+',
        isSponsored: true,
    },
];
