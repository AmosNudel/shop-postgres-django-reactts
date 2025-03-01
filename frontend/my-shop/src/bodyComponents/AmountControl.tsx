// AmountControl.tsx
import React, { useState } from 'react';

interface AmountControlProps {
  productName: string;
  productPrice: number;
  addToCart: () => void;
}

const AmountControl: React.FC<AmountControlProps> = ({ productName, productPrice, addToCart }) => {
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const increaseAmount = () => setAmount(amount + 1);
  const decreaseAmount = () => amount > 0 && setAmount(amount - 1);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token'); // Check if token exists in localStorage
    
    if (!token) {
      setMessage('Please log in or register to add items to the cart.');
      return;
    }

    // If there is a token, add the product to the cart
    if (amount > 0) {
      for (let i = 0; i < amount; i++) {
        addToCart();
      }
      setMessage('Item(s) added to the cart!');
    }
  };

  return (
    <div className="amount-control">
      <div className="amount-display">
        <h3>Amount: {amount}</h3>
      </div>
      <div className="buttons">
        <button onClick={decreaseAmount} disabled={amount === 0}>
          -
        </button>
        <button onClick={increaseAmount}>+</button>
      </div>
      <div className="add-to-cart">
        <button onClick={handleAddToCart} disabled={amount <= 0}>
          Add to Cart
        </button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default AmountControl;
