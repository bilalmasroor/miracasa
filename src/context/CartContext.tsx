import { createContext, useReducer, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { CartState, CartAction, CartItem } from '../types/cart';
import type { Product } from '../types/product';

interface CartContextType {
    state: CartState;
    addToCart: (product: Product, variant?: CartItem['selectedVariant']) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'miracasa-cart';

function calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
        const price = item.product.salePrice || item.product.price;
        return total + price * item.quantity;
    }, 0);
}

function calculateItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
}

function cartReducer(state: CartState, action: CartAction): CartState {
    let newItems: CartItem[];

    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === action.payload.product.id
            );

            if (existingItemIndex > -1) {
                newItems = [...state.items];
                newItems[existingItemIndex].quantity += 1;
            } else {
                newItems = [
                    ...state.items,
                    {
                        product: action.payload.product,
                        quantity: 1,
                        selectedVariant: action.payload.variant,
                    },
                ];
            }

            return {
                items: newItems,
                total: calculateTotal(newItems),
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'REMOVE_FROM_CART': {
            newItems = state.items.filter((item) => item.product.id !== action.payload.productId);
            return {
                items: newItems,
                total: calculateTotal(newItems),
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'UPDATE_QUANTITY': {
            newItems = state.items.map((item) =>
                item.product.id === action.payload.productId
                    ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                    : item
            );
            return {
                items: newItems,
                total: calculateTotal(newItems),
                itemCount: calculateItemCount(newItems),
            };
        }

        case 'CLEAR_CART':
            return {
                items: [],
                total: 0,
                itemCount: 0,
            };

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
}

const initialState: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }, [state]);

    const addToCart = (product: Product, variant?: CartItem['selectedVariant']) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, variant } });
    };

    const removeFromCart = (productId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
    };

    const updateQuantity = (productId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

export default CartContext;
