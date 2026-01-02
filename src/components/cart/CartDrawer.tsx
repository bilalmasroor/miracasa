
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { CartItem } from './CartItem';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { state } = useCart();

    return (
        <Drawer isOpen={isOpen} onClose={onClose} title="Shopping Cart">
            {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <ShoppingBag size={64} className="text-brand-text/20 mb-4" />
                    <h3 className="text-lg font-semibold text-brand-primary mb-2">Your cart is empty</h3>
                    <p className="text-sm text-brand-text/60 mb-6">Add some products to get started!</p>
                    <Link to="/shop">
                        <Button variant="cta" onClick={onClose}>Continue Shopping</Button>
                    </Link>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6">
                        {state.items.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-brand-text/10 p-6 space-y-4">
                        {/* Subtotal */}
                        <div className="flex items-center justify-between text-lg font-semibold">
                            <span className="text-brand-text">Subtotal:</span>
                            <span className="text-brand-primary">{formatPrice(state.total)}</span>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-2">
                            <Link to="/checkout">
                                <Button variant="cta" size="lg" className="w-full" onClick={onClose}>
                                    Proceed to Checkout
                                </Button>
                            </Link>
                            <Link to="/cart">
                                <Button variant="outline" size="lg" className="w-full" onClick={onClose}>
                                    View Full Cart
                                </Button>
                            </Link>
                        </div>

                        <p className="text-xs text-brand-text/60 text-center">
                            Shipping and taxes calculated at checkout
                        </p>
                    </div>
                </>
            )}
        </Drawer>
    );
}
