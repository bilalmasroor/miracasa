import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export function Login() {
    const { state, login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('demo@miracasa.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state.isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [state.isAuthenticated, navigate]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            const redirectPath = (location.state as { from?: string } | null)?.from || '/';
            navigate(redirectPath, { replace: true });
        } catch (err) {
            console.error(err);
            setError('Something went wrong while signing you in. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="section-spacing">
            <div className="container-custom grid lg:grid-cols-2 gap-10 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-brand-secondary bg-opacity-10 px-4 py-2 text-sm text-brand-secondary">
                        <CheckCircle size={16} />
                        <span>Secure login powered by MiraCasa</span>
                    </div>
                    <h1 className="text-4xl font-bold text-brand-primary">Welcome back</h1>
                    <p className="text-lg text-brand-text/70">
                        Sign in to access your wishlist, track orders, and enjoy faster checkout across all MiraCasa products.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {["Save favorites","Fast checkout","Order tracking","Secure data"].map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-sm text-brand-text/80">
                                <CheckCircle size={16} className="text-brand-secondary" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="shadow-lg">
                        <CardHeader className="pb-0">
                            <h2 className="text-2xl font-semibold text-brand-primary">Sign in to your account</h2>
                            <p className="text-brand-text/70 mt-2">Use the demo credentials or your email to continue.</p>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-text">Email</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-brand-text/10 bg-white px-3">
                                        <Mail size={18} className="text-brand-text/50" />
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            className="border-0 px-0"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-brand-text">Password</label>
                                    <div className="flex items-center gap-2 rounded-lg border border-brand-text/10 bg-white px-3">
                                        <Lock size={18} className="text-brand-text/50" />
                                        <Input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="border-0 px-0"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && <p className="text-sm text-red-600">{error}</p>}

                                <Button type="submit" variant="cta" size="md" className="w-full" isLoading={isLoading}>
                                    Sign In
                                </Button>

                                <div className="text-center text-sm text-brand-text/70">
                                    New here? <Link to="/shop" className="text-brand-secondary font-medium">Browse products</Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
