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

function CartItemRow({ item }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleDelete = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="cart-item-card">
      <img className="cart-item-img" src={item.image} alt={item.name} />

      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-unit-price">Unit price: ${item.price.toFixed(2)}</p>
        <p className="cart-item-subtotal">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button className="qty-btn" onClick={handleDecrease} aria-label="Decrease quantity">−</button>
          <span className="qty-display">{item.quantity}</span>
          <button className="qty-btn" onClick={handleIncrease} aria-label="Increase quantity">+</button>
        </div>
        <button className="delete-btn" onClick={handleDelete} aria-label={`Remove ${item.name}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}

function CartItem({ onHomeClick, onPlantsClick, onCartClick }) {
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalCost = useSelector(selectCartTotalCost);
  const [showModal, setShowModal] = useState(false);

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
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some plants to get started on your paradise!</p>
            <button className="get-started-btn" onClick={onPlantsClick} style={{ display: 'inline-flex', gap: '10px', border: 'none' }}>
              Browse Plants
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-section">
              <div className="cart-items-header">
                <h2>Selected Plants</h2>
                <span className="items-count-tag">{items.length} type{items.length !== 1 ? 's' : ''}</span>
              </div>
              {items.map(item => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <aside className="cart-summary">
              <h3>Order Summary</h3>

              <div className="total-plants-badge">
                <span className="number">{totalQuantity}</span>
                <div className="label">
                  Total<br />Plant{totalQuantity !== 1 ? 's' : ''}
                </div>
              </div>

              {items.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span className="amount">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="summary-row">
                <span>Shipping</span>
                <span className="amount" style={{ color: 'var(--green-mid)' }}>Free 🌿</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span className="amount">${totalCost.toFixed(2)}</span>
              </div>

              <button className="checkout-btn" onClick={() => setShowModal(true)}>
                Proceed to Checkout
              </button>

              <button className="continue-btn" onClick={onPlantsClick}>
                ← Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>

      {showModal && <CheckoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default CartItem;
