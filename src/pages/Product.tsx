import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, ArrowLeft, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/common/Rating';
import { Card, CardContent } from '@/components/ui/Card';
import { ProductGrid } from '@/components/product/ProductGrid';
import { formatPrice, calculateDiscount } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import products from '@/data/products';

export function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = useMemo(() => products.find((item) => item.id === id), [id]);
    const relatedProducts = useMemo(
        () => product ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : [],
        [product]
    );
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        if (product?.variants?.size?.length) {
            setSelectedSize(product.variants.size[0]);
        } else {
            setSelectedSize('');
        }

        if (product?.variants?.color?.length) {
            setSelectedColor(product.variants.color[0]);
        } else {
            setSelectedColor('');
        }
    }, [product]);

    if (!product) {
        return (
            <div className="section-spacing">
                <div className="container-custom text-center space-y-4">
                    <AlertCircle size={48} className="mx-auto text-brand-text/30" />
                    <h1 className="text-3xl font-bold text-brand-primary">Product not found</h1>
                    <p className="text-brand-text/70">This product may have been moved or is no longer available.</p>
                    <div className="flex justify-center gap-3">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                        <Link to="/shop">
                            <Button variant="cta">Browse Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const inWishlist = isInWishlist(product.id);
    const discount = product.salePrice ? calculateDiscount(product.price, product.salePrice) : null;
    const selectedVariant = product.variants
        ? {
            size: selectedSize || undefined,
            color: selectedColor || undefined,
        }
        : undefined;

    const handleAddToCart = () => {
        addToCart(product, selectedVariant);
    };

    const handleToggleWishlist = () => {
        if (inWishlist) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <div className="section-spacing">
            <div className="container-custom space-y-12">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-brand-text/70 hover:text-brand-primary transition-colors"
                >
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl border border-brand-text/10 shadow-sm overflow-hidden"
                    >
                        <div className="relative aspect-square bg-brand-bg/50">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            {product.isNew && <Badge variant="new" className="absolute top-4 left-4">New</Badge>}
                            {discount && <Badge variant="sale" className="absolute top-4 right-4">-{discount}%</Badge>}
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3 p-4 bg-brand-bg">
                                {product.images.slice(0, 4).map((img, idx) => (
                                    <img key={idx} src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-20 object-cover rounded-lg border border-brand-text/10" />
                                ))}
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 text-sm text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full">
                                <Sparkles size={16} />
                                <span>{product.category}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-brand-primary">{product.name}</h1>
                            <div className="flex items-center gap-3 text-sm text-brand-text/70">
                                <Rating rating={product.rating} size="md" showValue />
                                <span className="text-brand-text/60">{product.reviewCount} reviews</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-brand-primary">
                                    {formatPrice(product.salePrice || product.price)}
                                </span>
                                {product.salePrice && (
                                    <span className="text-lg text-brand-text/50 line-through">{formatPrice(product.price)}</span>
                                )}
                                {discount && <Badge variant="sale">Save {discount}%</Badge>}
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                {product.inStock ? (
                                    <span className="inline-flex items-center gap-1 text-brand-secondary">
                                        <CheckCircle size={16} /> In stock
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 text-red-600">
                                        <AlertCircle size={16} /> Out of stock
                                    </span>
                                )}
                                {product.inStock && product.stockCount < 10 && (
                                    <span className="text-brand-text/70">Only {product.stockCount} left</span>
                                )}
                            </div>
                        </div>

                        <p className="text-brand-text/80 leading-relaxed">{product.description}</p>

                        {product.variants && (
                            <Card className="border-brand-text/10">
                                <CardContent className="space-y-4">
                                    {product.variants.size && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-brand-text">Size</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.variants.size.map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`px-3 py-2 rounded-lg border text-sm transition-colors ${selectedSize === size ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-brand-text/20 text-brand-text/80 hover:border-brand-primary/50'}`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {product.variants.color && (
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-brand-text">Color</p>
                                            <div className="flex flex-wrap gap-2">
                                                {product.variants.color.map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setSelectedColor(color)}
                                                        className={`px-3 py-2 rounded-lg border text-sm transition-colors ${selectedColor === color ? 'border-brand-primary text-brand-primary bg-brand-primary/5' : 'border-brand-text/20 text-brand-text/80 hover:border-brand-primary/50'}`}
                                                    >
                                                        {color}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="cta"
                                size="lg"
                                className="flex-1 min-w-[200px]"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                            >
                                <ShoppingCart size={18} className="mr-2" />
                                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="min-w-[160px]"
                                onClick={handleToggleWishlist}
                            >
                                <Heart size={18} className="mr-2" />
                                {inWishlist ? 'Remove Wishlist' : 'Save to Wishlist'}
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-brand-primary">You may also like</h2>
                            <Link to="/shop" className="text-brand-secondary hover:text-brand-primary text-sm">View all</Link>
                        </div>
                        <ProductGrid products={relatedProducts} />
                    </div>
                )}
            </div>
        </div>
    );
}
