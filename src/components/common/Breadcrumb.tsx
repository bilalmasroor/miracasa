import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav className={cn('flex items-center space-x-2 text-sm', className)}>
            {items.map((item, index) => (
                <Fragment key={index}>
                    {index > 0 && (
                        <ChevronRight size={16} className="text-brand-text/40" />
                    )}
                    {item.href && index < items.length - 1 ? (
                        <Link
                            to={item.href}
                            className="text-brand-secondary hover:text-brand-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className={cn(
                                index === items.length - 1
                                    ? 'text-brand-text font-medium'
                                    : 'text-brand-text/60'
                            )}
                        >
                            {item.label}
                        </span>
                    )}
                </Fragment>
            ))}
        </nav>
    );
}
