# MiraCasa - Multi-Category eCommerce Website

A complete, modern, conversion-optimized eCommerce platform built with React, TypeScript, and Tailwind CSS. Features a strict 5-color brand palette, premium subtle animations, and scalable architecture supporting 500+ products.

![Brand Colors](https://via.placeholder.html/800x100/1F3D4E/FFFFFF?text=Deep+Trust+Blue) ![](https://via.placeholder.com/150x100/8A5A3B/FFFFFF?text=Leather+Brown) ![](https://via.placeholder.com/150x100/2F7D4A/FFFFFF?text=Olive+Green) ![](https://via.placeholder.com/150x100/F6F6F4/333333?text=Soft+Off-White) ![](https://via.placeholder.com/150x100/333333/FFFFFF?text=Charcoal+Gray)

## Features

- **510 Products** across 6 categories
- **Advanced Filtering** by category, price, rating, and availability
- **Multiple Sorting Options** (featured, price, rating, newest)
- **Shopping Cart** with localStorage persistence
- **Wishlist** functionality
- **Mock Authentication** system
- **Responsive Design** (mobile-first approach)
- **Premium Animations** with Framer Motion
- **Strict Brand Palette** enforcement
- **SEO Optimized** with proper meta tags and semantic HTML

## Brand Color Palette

The entire UI uses these 5 colors ONLY:

1. **Primary (60%)**: Deep Trust Blue `#1F3D4E` - Headers, footers, nav, major layout
2. **Secondary (30%)**: Leather Brown `#8A5A3B` - Subheadings, icons, category labels
3. **CTA (10%)**: Olive Green `#2F7D4A` - Add to Cart, Buy Now, Checkout (ONLY)
4. **Background**: Soft Off-White `#F6F6F4` - Page backgrounds, product grids
5. **Text**: Charcoal Gray `#333333` - Body text, descriptions

## Tech Stack

- **React** 18+ with **TypeScript**
- **Vite** for blazing-fast builds
- **Tailwind CSS** with custom theme
- **React Router** for routing
- **Framer Motion** for animations
- **Lucide React** for icons
- **Context API** + Reducers for state management
- **localStorage** for cart/wishlist persistence

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable primitives (Button, Input, Card, Modal, Drawer, Badge)
│   ├── layout/          # Header, Footer, Logo
│   ├── product/         # ProductCard, ProductGrid
│   ├── cart/            # CartDrawer, CartItem
│   └── common/          # Rating, Breadcrumb, Loading
├── pages/
│   ├── Home.tsx         # Hero, categories, featured products
│   ├── Shop.tsx         # Product listing with filters/sort/pagination
│   ├── Wishlist.tsx     # Saved products
│   ├── About.tsx        # Company information
│   ├── Contact.tsx      # Contact form
│   └── FAQ.tsx          # Frequently asked questions
├── layouts/
│   └── MainLayout.tsx   # Header + Footer wrapper
├── context/
│   ├── CartContext.tsx      # Shopping cart state
│   ├── WishlistContext.tsx  # Wishlist state
│   └── AuthContext.tsx      # Mock authentication
├── hooks/
│   └── useLocalStorage.ts   # localStorage persistence hook
├── data/
│   ├── products.ts           # 510 product dataset
│   ├── generateProducts.ts   # Product generator script
│   └── categories.ts         # 6 category definitions
├── types/
│   ├── product.ts    # Product, Filters, Sort types
│   ├── cart.ts       # Cart types and actions
│   └── user.ts       # User, Address, Order types
├── utils/
│   ├── cn.ts             # Class name utility (clsx + tailwind-merge)
│   └── formatters.ts     # Price, date, discount formatters
└── index.css         # Global styles + Tailwind directives

```

## Product Categories

1. **Home Improvement** - Tools and materials for projects
2. **Home Supplies** - Essential household items
3. **Handmade Leather Products & Shoes** - Artisan crafted goods
4. **Household Appliances** - Modern appliances
5. **Pet Supplies** - Products for pets
6. **Lifestyle-Easing Solutions** - Innovative daily helpers

## Generating/Extending Product Data

The product dataset is generated programmatically in `src/data/generateProducts.ts`. To modify:

```typescript
// Generate more products
export const products = generateProducts(1000); //  Instead of 510

// Add product templates for a category
const PRODUCT_TEMPLATES: Record<string, string[]> = {
  '1': [ // Home Improvement category
    'New Product Name',
    // ... more products
  ],
};
```

## Editing Categories

Categories are defined in `src/data/categories.ts`:

```typescript
export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Category Name',
    slug: 'category-slug',
    description: 'Category description',
  },
  // ... more categories
];
```

## Theme Customization

### Colors

Edit `src/index.css` CSS variables:

```css
:root {
  --brand-primary: #1F3D4E;
  --brand-secondary: #8A5A3B;
  --brand-cta: #2F7D4A;
  --brand-bg: #F6F6F4;
  --brand-text: #333333;
}
```

### Tailwind Theme

Modify `tailwind.config.js` for spacing, typography, animations.

## Key Components

### Button
```tsx
<Button variant="cta" size="lg">Add to Cart</Button>
// Variants: primary, secondary, cta, outline
// Sizes: sm, md, lg
```

### ProductCard
Displays product with image, price, rating, badges, wishlist toggle, and add-to-cart button.

### CartDrawer
Slide-in drawer showing cart items, subtotal, and checkout options.

### ProductGrid
Responsive grid layout for displaying multiple products (optimized for 500+).

## State Management

- **Cart**: Add/remove items, update quantities, persist to localStorage
- **Wishlist**: Save favorite products, move to cart
- **Auth**: Mock login/logout (ready for real API integration)

## Performance

- Lazy-loaded routes
- Lazy-loaded images
- Pagination (24 products per page)
- Virtualization-ready architecture
- Optimized animations (GPU-accelerated)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

MiraCasa eCommerce Platform
Built with strict brand identity and conversion optimization in mind.

---

**Need Help?**
- Check the FAQ page
- Contact support@miracasa.com
- Call 1-800-MIRACASA
