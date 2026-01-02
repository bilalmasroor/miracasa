import { createContext, useReducer, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AuthAction, User } from '../types/user';

interface AuthContextType {
    state: AuthState;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'miracasa-auth';

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload,
                isAuthenticated: true,
            };

        case 'LOGOUT':
            return {
                user: null,
                isAuthenticated: false,
            };

        case 'UPDATE_USER':
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload } : null,
            };

        default:
            return state;
    }
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load auth state from localStorage on mount
    useEffect(() => {
        try {
            const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
            if (savedAuth) {
                const authData = JSON.parse(savedAuth);
                if (authData.user) {
                    dispatch({ type: 'LOGIN', payload: authData.user });
                }
            }
        } catch (error) {
            console.error('Error loading auth state:', error);
        }
    }, []);

    // Save auth state to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error('Error saving auth state:', error);
        }
    }, [state]);

    const login = async (email: string, _password: string) => {
        // Mock authentication - in real app, this would be an API call
        const mockUser: User = {
            id: 'user-1',
            email,
            name: email.split('@')[0],
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=1F3D4E&color=F6F6F4`,
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        dispatch({ type: 'LOGIN', payload: mockUser });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const updateUser = (user: Partial<User>) => {
        dispatch({ type: 'UPDATE_USER', payload: user });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
