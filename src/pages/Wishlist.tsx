
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/Button';

export function Wishlist() {
    const { wishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div className="section-spacing">
                <div className="container-custom">
                    <div className="text-center py-16">
                        <Heart size={64} className="mx-auto text-brand-text/20 mb-4" />
                        <h2 className="text-2xl font-bold text-brand-primary mb-2">Your wishlist is empty</h2>
                        <p className="text-brand-text/60 mb-6">Start adding products you love!</p>
                        <Link to="/shop">
                            <Button variant="cta">Browse Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="section-spacing">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-brand-primary mb-2">My Wishlist</h1>
                    <p className="text-lg text-brand-text/70">{wishlist.length} items saved</p>
                </motion.div>

                <ProductGrid products={wishlist} />
            </div>
        </div>
    );
}
