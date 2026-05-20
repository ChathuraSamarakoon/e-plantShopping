import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../store/CartSlice';

function Navbar({ onHomeClick, onPlantsClick, onCartClick }) {
  const totalItems = useSelector(selectCartTotalQuantity);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <span className="logo-leaf">🌿</span>
          <span>
            Paradise Nursery
            <span className="logo-sub">Plant Shop</span>
          </span>
        </div>

        <div className="navbar-links">
          <button className="nav-link" onClick={onHomeClick}>Home</button>
          <button className="nav-link" onClick={onPlantsClick}>Plants</button>
          <button className="cart-nav-btn" onClick={onCartClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Cart
            <span className="cart-count-badge">{totalItems}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
