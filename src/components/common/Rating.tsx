import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface RatingProps {
    rating: number;
    maxRating?: number;
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    className?: string;
}

export function Rating({ rating, maxRating = 5, size = 'md', showValue = false, className }: RatingProps) {
    const sizes = {
        sm: 14,
        md: 18,
        lg: 24,
    };

    const iconSize = sizes[size];

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {Array.from({ length: maxRating }).map((_, index) => {
                const filled = index < Math.floor(rating);
                const partial = index < rating && index >= Math.floor(rating);

                return (
                    <div key={index} className="relative">
                        <Star
                            size={iconSize}
                            className={cn(
                                filled ? 'fill-brand-secondary text-brand-secondary' : 'fill-brand-text/10 text-brand-text/10',
                                'transition-colors duration-200'
                            )}
                        />
                        {partial && (
                            <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                                <Star size={iconSize} className="fill-brand-secondary text-brand-secondary" />
                            </div>
                        )}
                    </div>
                );
            })}
            {showValue && (
                <span className="ml-1 text-sm font-medium text-brand-text">{rating.toFixed(1)}</span>
            )}
        </div>
    );
}
