import { Link } from 'react-router-dom';

export function Logo() {
    return (
        <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-200 group-hover:scale-105"
                >
                    {/* Deep Trust Blue background */}
                    <rect width="40" height="40" rx="8" fill="#1F3D4E" />
                    {/* Leather Brown accent */}
                    <path
                        d="M20 8L30 15V25L20 32L10 25V15L20 8Z"
                        fill="#8A5A3B"
                    />
                    {/* Olive Green minimal accent */}
                    <circle cx="20" cy="20" r="4" fill="#2F7D4A" />
                </svg>
                <div className="ml-3">
                    <div className="text-xl font-bold text-brand-primary tracking-tight">MiraCasa</div>
                    <div className="text-xs text-brand-secondary -mt-1">Quality Living</div>
                </div>
            </div>
        </Link>
    );
}
