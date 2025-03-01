import React, { useState, useEffect } from 'react';
import CategoriesComponent from './bodyComponents/Categories'; 
import ProductsComponent from './bodyComponents/Products'; 
import Login from './headerComponents/Login'; 
import Logout from './headerComponents/Logout'; 
import { Route, Routes } from 'react-router-dom';
import CartComponent from './bodyComponents/CartComponent';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedCart = localStorage.getItem('cart');
    
    if (storedToken) {
      setIsLoggedIn(true);
    }

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Store cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  // Function to clear the cart (and remove it from localStorage)
  const clearCart = () => {
    setCart([]); // Clear cart from state
    localStorage.removeItem('cart'); // Clear cart from localStorage
  };

  return (
    <div className="App">
      <header className="bg-primary text-white py-3">
        <div className="container">
          <div className="d-flex justify-content-between">
            {isLoggedIn ? (
              <Logout setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )}
          </div>
        </div>
      </header>

      <div className="container mt-4">
        <div className="row">
          {/* Left column for Categories */}
          <div className="col-md-4">
            <CategoriesComponent />
          </div>

          {/* Right column for Products and Cart */}
          <div className="col-md-8">
            <Routes>
              <Route path="/" element={<CategoriesComponent />} />
              <Route
                path="category/:id"
                element={<ProductsComponent addToCart={addToCart} />}
              />
            </Routes>
            <CartComponent
              cartItems={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
