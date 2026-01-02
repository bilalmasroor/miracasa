import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem as CartItemType } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatters';

interface CartItemProps {
    item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="flex gap-4 py-4 border-b border-brand-text/10">
            {/* Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden bg-brand-bg flex-shrink-0">
                <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-brand-primary text-sm line-clamp-1">
                    {item.product.name}
                </h4>
                <p className="text-xs text-brand-text/60 mt-1">{item.product.category}</p>

                {/* Variant */}
                {item.selectedVariant && (
                    <div className="flex gap-2 mt-1 text-xs text-brand-text/60">
                        {item.selectedVariant.size && <span>Size: {item.selectedVariant.size}</span>}
                        {item.selectedVariant.color && <span>Color: {item.selectedVariant.color}</span>}
                    </div>
                )}

                {/* Price & Quantity */}
                <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-brand-primary">
                        {formatPrice(item.product.salePrice || item.product.price)}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-brand-bg transition-colors"
                            disabled={item.quantity <= 1}
                        >
                            <Minus size={14} className="text-brand-text" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-brand-bg transition-colors"
                        >
                            <Plus size={14} className="text-brand-text" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-brand-text/60 hover:text-red-500 transition-colors flex-shrink-0"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}
