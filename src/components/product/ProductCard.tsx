import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import type { Product } from '@/types/product';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Rating } from '../common/Rating';
import { Button } from '../ui/Button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { cn } from '@/utils/cn';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToCart(product);
    };

    const handleToggleWishlist = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    const discount = product.salePrice ? calculateDiscount(product.price, product.salePrice) : null;

    return (
        <Link to={`/product/${product.id}`}>
            <Card hover className="h-full flex flex-col">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-brand-bg/50">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300"
                        loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && <Badge variant="new">New</Badge>}
                        {discount && <Badge variant="sale">-{discount}%</Badge>}
                        {!product.inStock && <Badge variant="low-stock">Out of Stock</Badge>}
                        {product.inStock && product.stockCount < 10 && (
                            <Badge variant="low-stock">Only {product.stockCount} left</Badge>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={handleToggleWishlist}
                        className={cn(
                            'absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200',
                            inWishlist ? 'text-red-500' : 'text-brand-text/60 hover:text-brand-secondary'
                        )}
                    >
                        <Heart size={20} className={cn(inWishlist && 'fill-current')} />
                    </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Category */}
                    <p className="text-xs text-brand-secondary uppercase tracking-wide mb-1">
                        {product.category}
                    </p>

                    {/* Name */}
                    <h3 className="text-base font-semibold text-brand-primary mb-2 line-clamp-2">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <Rating rating={product.rating} size="sm" />
                        <span className="text-xs text-brand-text/60">({product.reviewCount})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4 mt-auto">
                        <span className="text-xl font-bold text-brand-primary">
                            {formatPrice(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && (
                            <span className="text-sm text-brand-text/50 line-through">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        variant="cta"
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="w-full"
                    >
                        <ShoppingCart size={16} className="mr-2" />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </div>
            </Card>
        </Link>
    );
}
