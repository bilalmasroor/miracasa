export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    category: string;
    images: string[];
    rating: number;
    reviewCount: number;
    inStock: boolean;
    stockCount: number;
    variants?: {
        size?: string[];
        color?: string[];
        material?: string[];
    };
    isFeatured: boolean;
    isNew: boolean;
    tags?: string[];
}

export interface ProductFilters {
    categories: string[];
    priceRange: [number, number];
    minRating?: number;
    inStock?: boolean;
}

export interface ProductSortOption {
    value: string;
    label: string;
}

export const SORT_OPTIONS: ProductSortOption[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' },
];
