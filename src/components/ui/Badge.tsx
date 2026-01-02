import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'new' | 'sale' | 'low-stock';
    className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
    const variantStyles = {
        default: 'bg-brand-primary/10 text-brand-primary',
        new: 'bg-brand-cta/10 text-brand-cta',
        sale: 'bg-brand-secondary/10 text-brand-secondary',
        'low-stock': 'bg-red-50 text-red-600',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
