
import { motion } from 'framer-motion';

export function About() {
    return (
        <div className="section-spacing">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-brand-primary mb-4">About MiraCasa</h1>
                    <p className="text-xl text-brand-text/70">
                        Your trusted partner for quality everyday products
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg max-w-none"
                >
                    <h2 className="text-3xl font-bold text-brand-primary mb-4">Our Story</h2>
                    <p className="text-brand-text/80 mb-6">
                        MiraCasa was founded with a simple mission: to provide high-quality, practical products that make everyday living easier and more enjoyable. As a multi-channel eCommerce brand, we carefully source and sell products across diverse categories including Home Improvement, Home Supplies, Handmade Leather Products & Shoes, Household Appliances, Pet Supplies, and Lifestyle-Easing Solutions.
                    </p>

                    <h2 className="text-3xl font-bold text-brand-primary mb-4 mt-12">Our Promise</h2>
                    <p className="text-brand-text/80 mb-6">
                        We believe that quality shouldn't be a luxury. That's why we work directly with manufacturers and artisans to bring you premium products at fair prices. Every item in our catalog is selected with care, tested for quality, and backed by our commitment to customer satisfaction.
                    </p>

                    <h2 className="text-3xl font-bold text-brand-primary mb-4 mt-12">Why Choose Us</h2>
                    <ul className="list-disc list-inside space-y-2 text-brand-text/80">
                        <li>Curated selection of high-quality products</li>
                        <li>Competitive pricing with frequent deals</li>
                        <li>Fast and reliable shipping</li>
                        <li>Dedicated customer support</li>
                        <li>Secure shopping experience</li>
                        <li>Satisfaction guaranteed</li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
}
