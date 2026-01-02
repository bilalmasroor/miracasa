import type { Product } from '../types/product';
import { generateProducts } from './generateProducts';

/**
 * Main product dataset - 500+ products
 */
export const products: Product[] = generateProducts(510);

/**
 * Export for easy access
 */
export default products;
