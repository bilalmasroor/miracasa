import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, User } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { CATEGORIES } from '@/data/categories';

export function Header({ onCartOpen }: { onCartOpen: () => void }) {
    const { state: cartState } = useCart();
    const { wishlist } = useWishlist();
    const { state: authState } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-brand-text/10 shadow-sm">
            {/* Top Bar */}
            <div className="bg-brand-primary text-white py-2">
                <div className="container-custom">
                    <div className="flex items-center justify-between text-sm">
                        <p>Free Shipping on Orders Over $50</p>
                        <div className="flex items-center gap-4">
                            <Link to="/order-tracking" className="hover:text-brand-bg/80 transition-colors">
                                Track Order
                            </Link>
                            <Link to="/contact" className="hover:text-brand-bg/80 transition-colors">
                                Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container-custom py-4">
                <div className="flex items-center justify-between gap-6">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link to="/" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            Home
                        </Link>
                        <Link to="/shop" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            Shop
                        </Link>
                        <div className="relative group">
                            <button className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                                Categories
                            </button>
                            {/* Dropdown */}
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-brand-text/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="p-2">
                                    {CATEGORIES.map((category) => (
                                        <Link
                                            key={category.id}
                                            to={`/shop/${category.slug}`}
                                            className="block px-4 py-2 text-sm text-brand-text hover:bg-brand-bg rounded-md transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            About
                        </Link>
                        <Link to="/contact" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            Contact
                        </Link>
                        <Link to="/faq" className="text-brand-text hover:text-brand-primary transition-colors font-medium">
                            FAQ
                        </Link>
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <button className="text-brand-text hover:text-brand-primary transition-colors">
                            <Search size={22} />
                        </button>

                        {/* Wishlist */}
                        <Link to="/wishlist" className="relative text-brand-text hover:text-brand-primary transition-colors">
                            <Heart size={22} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={onCartOpen}
                            className="relative text-brand-text hover:text-brand-primary transition-colors"
                        >
                            <ShoppingCart size={22} />
                            {cartState.itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-cta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                    {cartState.itemCount}
                                </span>
                            )}
                        </button>

                        {/* Account */}
                        <Link to={authState.isAuthenticated ? '/account' : '/login'} className="text-brand-text hover:text-brand-primary transition-colors">
                            <User size={22} />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden text-brand-text"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-brand-text/10 bg-white">
                    <nav className="container-custom py-4 space-y-2">
                        <Link to="/" className="block py-2 text-brand-text hover:text-brand-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                            Home
                        </Link>
                        <Link to="/shop" className="block py-2 text-brand-text hover:text-brand-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                            Shop
                        </Link>
                        <div className="border-l-2 border-brand-secondary pl-4 space-y-1">
                            {CATEGORIES.map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/shop/${category.slug}`}
                                    className="block py-1 text-sm text-brand-text hover:text-brand-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <Link to="/about" className="block py-2 text-brand-text hover:text-brand-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>
                        <Link to="/contact" className="block py-2 text-brand-text hover:text-brand-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                            Contact
                        </Link>
                        <Link to="/faq" className="block py-2 text-brand-text hover:text-brand-primary transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>
                            FAQ
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
