import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
    position?: 'left' | 'right';
}

export function Drawer({
    isOpen,
    onClose,
    children,
    title,
    className,
    position = 'right',
}: DrawerProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-brand-primary/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: position === 'right' ? '100%' : '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: position === 'right' ? '100%' : '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className={cn(
                            'fixed top-0 bottom-0 bg-white shadow-2xl z-50 w-full max-w-md flex flex-col',
                            position === 'right' ? 'right-0' : 'left-0',
                            className
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-brand-text/10">
                            <h3 className="text-xl font-semibold text-brand-primary">{title}</h3>
                            <button
                                onClick={onClose}
                                className="text-brand-text/60 hover:text-brand-text transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto scrollbar-custom">{children}</div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
