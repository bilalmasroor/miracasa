import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, Shield, Truck, Headphones } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { Button } from '../ui/Button';

export function Footer() {
    return (
        <footer className="bg-brand-primary text-white mt-auto">
            {/* Trust Badges */}
            <div className="border-b border-white/10">
                <div className="container-custom py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-cta rounded-lg">
                                <Truck size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold">Free Shipping</h4>
                                <p className="text-sm text-white/80">On orders over $50</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-cta rounded-lg">
                                <Headphones size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold">24/7 Support</h4>
                                <p className="text-sm text-white/80">Always here to help</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-brand-cta rounded-lg">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h4 className="font-semibold">Secure Checkout</h4>
                                <p className="text-sm text-white/80">Safe & encrypted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="mb-4">
                            <div className="flex items-center space-x-2">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect width="40" height="40" rx="8" fill="#F6F6F4" />
                                    <path d="M20 8L30 15V25L20 32L10 25V15L20 8Z" fill="#8A5A3B" />
                                    <circle cx="20" cy="20" r="4" fill="#2F7D4A" />
                                </svg>
                                <div>
                                    <div className="text-xl font-bold">MiraCasa</div>
                                    <div className="text-xs text-white/80">Quality Living</div>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-white/80 mb-4">
                            Your trusted source for high-quality everyday products across multiple categories.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="text-white/80 hover:text-brand-secondary transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="text-white/80 hover:text-brand-secondary transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="text-white/80 hover:text-brand-secondary transition-colors">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {CATEGORIES.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        to={`/shop/${category.slug}`}
                                        className="text-sm text-white/80 hover:text-brand-secondary transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/order-tracking" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    Track Order
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-sm text-white/80 hover:text-brand-secondary transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-white/80 mb-4">
                            Subscribe to get special offers, updates, and exclusive deals.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                            <Button variant="cta" size="sm" className="w-full">
                                Subscribe
                            </Button>
                        </form>
                        <div className="mt-4 space-y-1 text-sm text-white/80">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <span>support@miracasa.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} />
                                <span>1-800-MIRACASA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-4">
                    <p className="text-center text-sm text-white/60">
                        © {new Date().getFullYear()} MiraCasa. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
