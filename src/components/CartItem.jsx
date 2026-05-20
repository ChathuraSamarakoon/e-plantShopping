import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalCost,
  updateQuantity,
  removeItem,
} from '../store/CartSlice';
import Navbar from './Navbar';

function CheckoutModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-icon">🌿</div>
        <h2>Coming Soon!</h2>
        <p>
          We're working hard to bring you a seamless checkout experience.
          Stay tuned — your plants will be on their way to you very soon!
        </p>
        <button className="modal-close-btn" onClick={onClose}>
          Keep Browsing
        </button>
      </div>
    </div>
  );
}

const CartItem = ({ onHomeClick, onPlantsClick, onCartClick }) => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalCost = useSelector(selectCartTotalCost);
  const [showModal, setShowModal] = useState(false);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const calculateTotalCost = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-page">
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
      />

      <div className="cart-hero">
        <h1>Your Shopping Cart</h1>
        <p>Review your plants before checkout</p>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some plants to get started on your paradise!</p>
            <button
              className="get-started-btn"
              onClick={onPlantsClick}
              style={{ display: 'inline-flex', gap: '10px', border: 'none' }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Cart Items */}
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Selected Plants</h2>
                <span className="items-count-tag">
                  Total Plants: {totalQuantity}
                </span>
              </div>

              {cart.map(item => (
                <div key={item.id} className="cart-item-card">
                  <img
                    className="cart-item-img"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit-price">
                      Unit Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="cart-item-subtotal">
                      Total: ${calculateTotalCost(item)}
                    </p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="cart-summary">
              <h3>Order Summary</h3>

              <div className="total-plants-badge">
                <span className="number">{totalQuantity}</span>
                <div className="label">Total Plants in Cart</div>
              </div>

              {cart.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="amount">${calculateTotalCost(item)}</span>
                </div>
              ))}

              <div className="summary-row total">
                <span>Total Amount</span>
                <span className="amount">${totalCost.toFixed(2)}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => setShowModal(true)}
              >
                Checkout
              </button>

              <button
                className="continue-btn"
                onClick={onPlantsClick}
              >
                Continue Shopping
              </button>
            </aside>

          </div>
        )}
      </div>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CartItem;
