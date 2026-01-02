import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-brand-text mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'w-full px-4 py-3 rounded-lg border border-brand-text/20 bg-white text-brand-text',
                        'focus:outline-none focus:ring-2 focus:ring-brand-secondary/30 focus:border-brand-secondary',
                        'transition-all duration-200',
                        'placeholder:text-brand-text/50',
                        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
