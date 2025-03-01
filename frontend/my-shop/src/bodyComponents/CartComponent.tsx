import React from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartComponentProps {
  cartItems: CartItem[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartComponent: React.FC<CartComponentProps> = ({ cartItems, increaseQuantity, decreaseQuantity, removeItem, clearCart }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul className="list-group">
        {cartItems.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
              <button className="btn btn-success btn-sm mx-2" onClick={() => increaseQuantity(item.id)}>+</button>
              <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <h3>Total: ${totalPrice}</h3>
        <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default CartComponent;
