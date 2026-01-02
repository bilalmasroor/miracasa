/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: 'var(--brand-primary)',
                    secondary: 'var(--brand-secondary)',
                    cta: 'var(--brand-cta)',
                    bg: 'var(--brand-bg)',
                    text: 'var(--brand-text)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
    // Safelist brand colors to ensure they're always available
    safelist: [
        'text-brand-primary',
        'text-brand-secondary',
        'text-brand-cta',
        'text-brand-bg',
        'text-brand-text',
        'bg-brand-primary',
        'bg-brand-secondary',
        'bg-brand-cta',
        'bg-brand-bg',
        'bg-brand-text',
        'border-brand-primary',
        'border-brand-secondary',
        'border-brand-cta',
    ],
}
