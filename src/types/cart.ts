import type { Product } from './product';

export interface CartItem {
    product: Product;
    quantity: number;
    selectedVariant?: {
        size?: string;
        color?: string;
        material?: string;
    };
}

export interface CartState {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export type CartAction =
    | { type: 'ADD_TO_CART'; payload: { product: Product; variant?: CartItem['selectedVariant'] } }
    | { type: 'REMOVE_FROM_CART'; payload: { productId: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartState };
