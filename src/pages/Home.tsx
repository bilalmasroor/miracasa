
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductGrid } from '../components/product/ProductGrid';
import { Card } from '../components/ui/Card';
import products from '../data/products';
import { CATEGORIES } from '../data/categories';
import { getFeaturedProducts, getNewProducts } from '../data/generateProducts';

export function Home() {
    const featuredProducts = getFeaturedProducts(products, 8);
    const newProducts = getNewProducts(products, 8);

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-brand-primary text-white">
                <div className="container-custom section-spacing">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                                Quality Products for Your Everyday Life
                            </h1>
                            <p className="text-xl text-white/90 mb-8">
                                Discover high-quality items across home improvement, lifestyle, and more. Trusted by thousands of satisfied customers.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/shop">
                                    <Button variant="cta" size="lg">
                                        Shop Now <ArrowRight className="ml-2" size={20} />
                                    </Button>
                                </Link>
                                <Link to="/about">
                                    <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-brand-primary">
                                        Learn More
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="aspect-square rounded-2xl bg-brand-secondary/20 flex items-center justify-center">
                                <Package size={200} className="text-brand-secondary opacity-50" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
                            Explore our diverse range of products across multiple categories
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORIES.map((category, index) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link to={`/shop/${category.slug}`}>
                                    <Card hover className="text-center p-6">
                                        <div className="aspect-square bg-brand-bg rounded-lg mb-4 flex items-center justify-center">
                                            <Package size={40} className="text-brand-secondary" />
                                        </div>
                                        <h3 className="font-semibold text-brand-primary text-sm line-clamp-2">
                                            {category.name}
                                        </h3>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section-spacing bg-brand-bg/50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                                Featured Products
                            </h2>
                            <p className="text-lg text-brand-text/70">
                                Handpicked items just for you
                            </p>
                        </div>
                        <Link to="/shop">
                            <Button variant="outline">View All</Button>
                        </Link>
                    </motion.div>

                    <ProductGrid products={featuredProducts} />
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section-spacing">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-between mb-12"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                                New Arrivals
                            </h2>
                            <p className="text-lg text-brand-text/70">
                                Check out our latest additions
                            </p>
                        </div>
                        <Link to="/shop?sort=newest">
                            <Button variant="outline">View All</Button>
                        </Link>
                    </motion.div>

                    <ProductGrid products={newProducts} />
                </div>
            </section>

            {/* Benefits Section */}
            <section className="section-spacing bg-brand-primary text-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-cta rounded-full mb-4">
                                <Shield size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                            <p className="text-white/80">
                                All products are carefully selected and quality-tested
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-cta rounded-full mb-4">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                            <p className="text-white/80">
                                Competitive pricing with frequent deals and discounts
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-cta rounded-full mb-4">
                                <Package size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-white/80">
                                Quick and reliable shipping to your doorstep
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
