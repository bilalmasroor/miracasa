import type { Product } from '../types/product';
import { CATEGORIES } from './categories';

/**
 * Product name templates by category
 */
const PRODUCT_TEMPLATES: Record<string, string[]> = {
    '1': [ // Home Improvement
        'Professional Paint Roller',
        'Heavy Duty Drill Set',
        'Multi-Purpose Ladder',
        'Wood Finishing Kit',
        'Tile Installation Tool Kit',
        'Premium Paint Brush Set',
        'Electric Sander',
        'Measuring Tape Pro',
        'LED Work Light',
        'Safety Goggles Set',
        'Power Tool Organizer',
        'Wall Anchor Kit',
        'Cordless Screwdriver',
        'Level Tool Set',
        'Utility Knife',
    ],
    '2': [ // Home Supplies
        'Microfiber Cleaning Cloth Set',
        'Storage Container Set',
        'Laundry Basket',
        'Trash Can with Lid',
        'Dish Drying Rack',
        'Broom and Dustpan Set',
        'Mop and Bucket System',
        'Vacuum Storage Bags',
        'Drawer Organizer Set',
        'Bathroom Caddy',
        'Kitchen Towel Set',
        'Recycling Bin',
        'Closet Organizer',
        'Shoe Rack',
        'Hangers Set',
    ],
    '3': [ // Handmade Leather Products & Shoes
        'Handcrafted Leather Wallet',
        'Artisan Leather Belt',
        'Leather Messenger Bag',
        'Leather Ankle Boots',
        'Handmade Leather Sandals',
        'Leather Card Holder',
        'Leather Tote Bag',
        'Leather Laptop Sleeve',
        'Oxford Leather Shoes',
        'Leather Travel Bag',
        'Leather Watch Strap',
        'Handcrafted Leather Journal',
        'Leather Backpack',
        'Leather Loafers',
        'Leather Crossbody Bag',
    ],
    '4': [ // Household Appliances
        'Stainless Steel Coffee Maker',
        'High Speed Blender',
        'Air Fryer',
        'Slow Cooker',
        'Electric Kettle',
        'Toast Oven',
        'Food Processor',
        'Stand Mixer',
        'Rice Cooker',
        'Vacuum Cleaner',
        'Steam Iron',
        'Microwave Oven',
        'Electric Grill',
        'Hand Mixer',
        'Juicer Machine',
    ],
    '5': [ // Pet Supplies
        'Premium Dog Food Bowl',
        'Cat Scratching Post',
        'Dog Leash and Collar Set',
        'Pet Bed',
        'Cat Litter Box',
        'Dog Toy Set',
        'Pet Carrier',
        'Automatic Pet Feeder',
        'Cat Tree Tower',
        'Dog Grooming Kit',
        'Pet Water Fountain',
        'Bird Cage',
        'Hamster Habitat',
        'Fish Tank Kit',
        'Pet Training Pads',
    ],
    '6': [ // Lifestyle-Easing Solutions
        'Smart Organizer System',
        'Cable Management Box',
        'Laptop Stand',
        'Ergonomic Desk Chair',
        'LED Desk Lamp',
        'Wireless Charging Station',
        'Portable Power Bank',
        'Bluetooth Headphones',
        'Smart Water Bottle',
        'Fitness Tracker',
        'Massage Gun',
        'Yoga Mat',
        'Portable Humidifier',
        'Essential Oil Diffuser',
        'Sleep Mask with Bluetooth',
    ],
};

const DESCRIPTIONS: string[] = [
    'High-quality and durable construction for long-lasting use',
    'Expertly crafted with attention to detail and premium materials',
    'Designed for comfort and functionality in everyday use',
    'Perfect blend of style and practicality',
    'Professional-grade quality at an affordable price',
    'Trusted by thousands of satisfied customers',
    'Easy to use with intuitive design',
    'Built to last with superior craftsmanship',
    'Essential addition to your collection',
    'Combines modern design with traditional quality',
];

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

function randomBoolean(probability: number = 0.5): boolean {
    return Math.random() < probability;
}

function generatePrice(): { price: number; salePrice?: number } {
    const basePrice = randomInt(10, 500);
    const price = Math.round(basePrice * 10) / 10;

    // 30% chance of sale
    if (randomBoolean(0.3)) {
        const discount = randomInt(10, 40) / 100;
        const salePrice = Math.round(price * (1 - discount) * 10) / 10;
        return { price, salePrice };
    }

    return { price };
}

/**
 * Generate a single product
 */
function generateProduct(id: number, categoryId: string, productName: string): Product {
    const { price, salePrice } = generatePrice();
    const category = CATEGORIES.find(c => c.id === categoryId)!;

    return {
        id: `prod-${id}`,
        name: productName,
        description: randomChoice(DESCRIPTIONS),
        price,
        salePrice,
        category: category.name,
        images: [
            `https://placehold.co/600x600/1F3D4E/F6F6F4?text=${encodeURIComponent(productName)}`,
            `https://placehold.co/600x600/8A5A3B/F6F6F4?text=${encodeURIComponent(productName)}`,
            `https://placehold.co/600x600/2F7D4A/F6F6F4?text=${encodeURIComponent(productName)}`,
        ],
        rating: Math.round((randomInt(35, 50) / 10) * 10) / 10, // 3.5 to 5.0
        reviewCount: randomInt(5, 500),
        inStock: randomBoolean(0.9), // 90% in stock
        stockCount: randomInt(0, 100),
        variants: categoryId === '3' ? { // Leather products have variants
            size: ['S', 'M', 'L', 'XL'],
            color: ['Black', 'Brown', 'Tan'],
        } : undefined,
        isFeatured: randomBoolean(0.1), // 10% featured
        isNew: randomBoolean(0.15), // 15% new
        tags: [],
    };
}

/**
 * Generate 500+ products distributed across categories
 */
export function generateProducts(count: number = 500): Product[] {
    const products: Product[] = [];
    let productId = 1;

    // Calculate products per category (roughly equal distribution)
    const productsPerCategory = Math.floor(count / CATEGORIES.length);
    const remainder = count % CATEGORIES.length;

    CATEGORIES.forEach((category, index) => {
        const templates = PRODUCT_TEMPLATES[category.id];
        const categoryProductCount = productsPerCategory + (index < remainder ? 1 : 0);

        // Generate products for this category
        for (let i = 0; i < categoryProductCount; i++) {
            // Cycle through templates and add variations
            const baseTemplate = templates[i % templates.length];
            const variation = Math.floor(i / templates.length);
            const productName = variation > 0 ? `${baseTemplate} - Edition ${variation + 1}` : baseTemplate;

            products.push(generateProduct(productId++, category.id, productName));
        }
    });

    return products;
}

/**
 * Get featured products
 */
export function getFeaturedProducts(products: Product[], count: number = 8): Product[] {
    return products.filter(p => p.isFeatured).slice(0, count);
}

/**
 * Get new arrivals
 */
export function getNewProducts(products: Product[], count: number = 12): Product[] {
    return products.filter(p => p.isNew).slice(0, count);
}

/**
 * Filter products by category
 */
export function filterByCategory(products: Product[], categoryName: string): Product[] {
    return products.filter(p => p.category === categoryName);
}

/**
 * Sort products
 */
export function sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        case 'price-desc':
            return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
        case 'featured':
        default:
            return sorted.filter(p => p.isFeatured).concat(sorted.filter(p => !p.isFeatured));
    }
}
