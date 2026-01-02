import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { CartDrawer } from './components/cart/CartDrawer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQ } from './pages/FAQ';
import { Wishlist } from './pages/Wishlist';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Routes>
              <Route element={<MainLayout onCartOpen={() => setCartOpen(true)} />}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:category" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/wishlist" element={<Wishlist />} />
              </Route>
            </Routes>

            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
