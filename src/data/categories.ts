export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
}

export const CATEGORIES: Category[] = [
    {
        id: '1',
        name: 'Home Improvement',
        slug: 'home-improvement',
        description: 'Quality tools and materials for all your home improvement projects',
    },
    {
        id: '2',
        name: 'Home Supplies',
        slug: 'home-supplies',
        description: 'Essential supplies for your everyday home needs',
    },
    {
        id: '3',
        name: 'Handmade Leather Products & Shoes',
        slug: 'leather-products',
        description: 'Artisan crafted leather goods and footwear',
    },
    {
        id: '4',
        name: 'Household Appliances',
        slug: 'household-appliances',
        description: 'Modern appliances to make your life easier',
    },
    {
        id: '5',
        name: 'Pet Supplies',
        slug: 'pet-supplies',
        description: 'Everything your furry friends need to stay happy and healthy',
    },
    {
        id: '6',
        name: 'Lifestyle-Easing Solutions',
        slug: 'lifestyle-solutions',
        description: 'Innovative products designed to simplify your daily routine',
    },
];

export function getCategoryBySlug(slug: string): Category | undefined {
    return CATEGORIES.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
    return CATEGORIES.find((cat) => cat.id === id);
}
