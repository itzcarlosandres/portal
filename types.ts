import { ComponentType } from 'react';

export type Category = string;
export type Author = string;
export type Platform = string;
export type License = string;
export type Requirement = string;

export interface Review {
    id: string;
    author: string;
    rating: number; // 1-5
    comment: string;
    date: string; // YYYY-MM-DD
}

export interface Software {
    id: string;
    name: string;
    slug: string;
    logo: string; // Can be an icon name or a base64 string
    screenshots: string[]; // Array of base64 strings
    category: Category;
    description: string;
    detailedDescription: string;
    rating: number; // average rating
    version: string;
    reviews: Review[];
    downloads: number;
    
    // New detailed fields
    size: number;
    unit: 'KB' | 'MB' | 'GB';
    downloadUrl: string;
    buyUrl?: string; // Optional affiliate link

    // Additional Information
    author: Author;
    platform: Platform;
    license: License;
    requirements: Requirement;
    isFeatured?: boolean;
    isSponsored?: boolean;
}
