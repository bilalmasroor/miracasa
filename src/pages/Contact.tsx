
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function Contact() {
    return (
        <div className="section-spacing">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-brand-primary mb-4">Contact Us</h1>
                    <p className="text-lg text-brand-text/70 max-w-2xl mx-auto">
                        Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <form className="space-y-6">
                            <Input label="Name" type="text" placeholder="Your name" />
                            <Input label="Email" type="email" placeholder="your@email.com" />
                            <Input label="Subject" type="text" placeholder="How can we help?" />
                            <div>
                                <label className="block text-sm font-medium text-brand-text mb-2">Message</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-lg border border-brand-text/20 bg-white text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-secondary min-h-[150px]"
                                    placeholder="Your message..."
                                />
                            </div>
                            <Button variant="cta" size="lg" className="w-full">Send Message</Button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-brand-primary mb-6">Get in Touch</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-cta/10 rounded-lg">
                                        <Mail className="text-brand-cta" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-primary">Email</h4>
                                        <p className="text-brand-text/70">support@miracasa.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-cta/10 rounded-lg">
                                        <Phone className="text-brand-cta" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-primary">Phone</h4>
                                        <p className="text-brand-text/70">1-800-MIRACASA</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-brand-cta/10 rounded-lg">
                                        <MapPin className="text-brand-cta" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-primary">Address</h4>
                                        <p className="text-brand-text/70">123 Commerce Street, Suite 100<br />New York, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
