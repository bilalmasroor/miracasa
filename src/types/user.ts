export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface Address {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone: string;
}

export interface Order {
    id: string;
    userId: string;
    items: any[]; // CartItem[]
    shippingAddress: Address;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    trackingNumber?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export type AuthAction =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: Partial<User> };
