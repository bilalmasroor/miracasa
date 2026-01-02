import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import products from '../data/products';
import { CATEGORIES } from '../data/categories';
import { sortProducts } from '../data/generateProducts';
import { SORT_OPTIONS } from '../types/product';

export function Shop() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState('featured');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 24;

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products;

        if (selectedCategory !== 'all') {
            const category = CATEGORIES.find(c => c.slug === selectedCategory);
            if (category) {
                filtered = products.filter(p => p.category === category.name);
            }
        }

        return sortProducts(filtered, sortBy);
    }, [selectedCategory, sortBy]);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return filteredAndSortedProducts.slice(startIndex, startIndex + productsPerPage);
    }, [filteredAndSortedProducts, currentPage]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

    return (
        <div className="section-spacing">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-brand-primary mb-2">Shop All Products</h1>
                    <p className="text-lg text-brand-text/70">
                        Showing {paginatedProducts.length} of {filteredAndSortedProducts.length} products
                    </p>
                </motion.div>

                {/* Filters & Sort */}
                <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        <Button
                            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                        >
                            All
                        </Button>
                        {CATEGORIES.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.slug ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => { setSelectedCategory(category.slug); setCurrentPage(1); }}
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-brand-text/20 bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                    >
                        {SORT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Products Grid */}
                <ProductGrid products={paginatedProducts} />

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'primary' : 'outline'}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            );
                        })}
                        <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
