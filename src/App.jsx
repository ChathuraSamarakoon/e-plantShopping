import { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProductList(false);
  };

  const handlePlantsClick = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    setShowCart(false);
  };

  if (showCart) {
    return (
      <CartItem
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />
    );
  }

  if (showProductList) {
    return (
      <ProductList
        onHomeClick={handleHomeClick}
        onPlantsClick={handlePlantsClick}
        onCartClick={handleCartClick}
      />
    );
  }

  return (
    <div className="landing-page">
      <div className="landing-overlay" />
      <div className="landing-content">
        <span className="landing-badge">🌿 Est. 2024 · Sri Lanka</span>

        <h1 className="landing-title">
          Welcome to Paradise Nursery
        </h1>

        <p className="landing-tagline">Where every leaf tells a story</p>

        <p className="landing-description">
          Bringing the lush beauty of tropical greenery into your home.
          We curate rare and beloved houseplants — lovingly grown, carefully
          selected, and delivered to your door so you can cultivate your own
          little paradise.
        </p>

        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <div className="landing-features">
          <div className="feature-item">
            <span className="icon">🌱</span>
            <span>100+ Varieties</span>
          </div>
          <div className="feature-item">
            <span className="icon">📦</span>
            <span>Safe Delivery</span>
          </div>
          <div className="feature-item">
            <span className="icon">💚</span>
            <span>Plant Guarantee</span>
          </div>
          <div className="feature-item">
            <span className="icon">🌍</span>
            <span>Eco Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
