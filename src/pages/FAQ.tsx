import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const faqs = [
    {
        question: 'What are your shipping options?',
        answer: 'We offer free standard shipping on orders over $50. Express shipping is available for an additional fee. Most orders are processed within 1-2 business days.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on most items. Products must be unused and in their original packaging. Please contact our support team to initiate a return.',
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order on our Order Tracking page using your order number.',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within the United States. We\'re working on expanding our shipping options to include international destinations.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can reach our support team via email at support@miracasa.com or call us at 1-800-MIRACASA. We\'re available Monday-Friday, 9am-6pm EST.',
    },
    {
        question: 'Are your products covered by warranty?',
        answer: 'Many of our products come with manufacturer warranties. Specific warranty information is available on each product page.',
    },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-brand-text/10 last:border-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex items-center justify-between text-left group"
            >
                <h3 className="font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors pr-4">
                    {faq.question}
                </h3>
                <ChevronDown
                    size={20}
                    className={cn(
                        'text-brand-text/60 transition-transform flex-shrink-0',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pb-6"
                >
                    <p className="text-brand-text/70">{faq.answer}</p>
                </motion.div>
            )}
        </motion.div>
    );
}

export function FAQ() {
    return (
        <div className="section-spacing">
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-brand-primary mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-brand-text/70">
                        Find answers to common questions about our products and services
                    </p>
                </motion.div>

                <div className="bg-white rounded-lg shadow-sm border border-brand-text/10 p-6 md:p-8">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
