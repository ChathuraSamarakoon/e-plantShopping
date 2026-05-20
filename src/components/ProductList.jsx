import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartItems } from '../store/CartSlice';
import Navbar from './Navbar';

const plantCategories = [
  {
    id: 'tropical',
    name: '🌴 Tropical Foliage',
    plants: [
      {
        id: 'monstera-deliciosa',
        name: 'Monstera Deliciosa',
        latin: 'Monstera deliciosa',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
        description: 'The iconic Swiss cheese plant with dramatic split leaves.',
        badge: 'Bestseller',
      },
      {
        id: 'bird-of-paradise',
        name: 'Bird of Paradise',
        latin: 'Strelitzia reginae',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80',
        description: 'Regal tropical plant with enormous paddle-shaped leaves.',
        badge: 'Statement',
      },
      {
        id: 'philodendron-brasil',
        name: 'Philodendron Brasil',
        latin: 'Philodendron hederaceum',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&auto=format&fit=crop&q=80',
        description: 'Vibrant heart-shaped leaves with golden-yellow variegation.',
        badge: 'Easy Care',
      },
      {
        id: 'calathea-orbifolia',
        name: 'Calathea Orbifolia',
        latin: 'Calathea orbifolia',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=400&auto=format&fit=crop&q=80',
        description: 'Stunning round leaves with silver-green pinstripes.',
        badge: 'Rare',
      },
      {
        id: 'alocasia-polly',
        name: "Alocasia 'Polly'",
        latin: 'Alocasia amazonica',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1598880940952-6b05e7f5b25d?w=400&auto=format&fit=crop&q=80',
        description: 'Dark arrow-shaped leaves with contrasting white veins.',
        badge: 'Popular',
      },
      {
        id: 'banana-plant',
        name: 'Dwarf Banana Plant',
        latin: 'Musa acuminata',
        price: 32.99,
        image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=400&auto=format&fit=crop&q=80',
        description: 'Lush paddle leaves that transport you to the tropics.',
        badge: 'Exotic',
      },
    ],
  },
  {
    id: 'succulents',
    name: '🌵 Succulents & Cacti',
    plants: [
      {
        id: 'echeveria-elegans',
        name: 'Echeveria Elegans',
        latin: 'Echeveria elegans',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop&q=80',
        description: 'Perfect rosette succulent in soft blue-green.',
        badge: 'Beginner',
      },
      {
        id: 'jade-plant',
        name: 'Jade Plant',
        latin: 'Crassula ovata',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=400&auto=format&fit=crop&q=80',
        description: 'A classic good-luck plant with thick, glossy leaves.',
        badge: 'Lucky',
      },
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        latin: 'Aloe barbadensis',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400&auto=format&fit=crop&q=80',
        description: 'Beautiful to look at and packed with skin-soothing gel.',
        badge: 'Useful',
      },
      {
        id: 'string-of-pearls',
        name: 'String of Pearls',
        latin: 'Senecio rowleyanus',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=400&auto=format&fit=crop&q=80',
        description: 'Cascading tendrils of perfectly round bead-like leaves.',
        badge: 'Trending',
      },
      {
        id: 'barrel-cactus',
        name: 'Golden Barrel Cactus',
        latin: 'Echinocactus grusonii',
        price: 16.99,
        image: 'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=400&auto=format&fit=crop&q=80',
        description: 'A structural sphere of golden spines.',
        badge: 'Low Water',
      },
      {
        id: 'haworthia',
        name: 'Haworthia Fasciata',
        latin: 'Haworthia fasciata',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?w=400&auto=format&fit=crop&q=80',
        description: 'Zebra-striped succulent that thrives in low light.',
        badge: 'Compact',
      },
    ],
  },
  {
    id: 'air-purifying',
    name: '✨ Air-Purifying Plants',
    plants: [
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        latin: 'Dracaena trifasciata',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop&q=80',
        description: 'NASA-approved air purifier that works through the night.',
        badge: 'NASA Pick',
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        latin: 'Spathiphyllum wallisii',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1616036740257-9449ea1f6605?w=400&auto=format&fit=crop&q=80',
        description: 'Elegant white blooms that filter indoor toxins.',
        badge: 'Flowering',
      },
      {
        id: 'pothos-golden',
        name: 'Golden Pothos',
        latin: 'Epipremnum aureum',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1607398420543-f30c63892dc2?w=400&auto=format&fit=crop&q=80',
        description: 'Purifies air, grows anywhere, nearly impossible to kill.',
        badge: 'Easiest',
      },
      {
        id: 'spider-plant',
        name: 'Spider Plant',
        latin: 'Chlorophytum comosum',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1627830142280-065d91ff4b21?w=400&auto=format&fit=crop&q=80',
        description: 'Arching green-and-white leaves. Pet-friendly!',
        badge: 'Pet Safe',
      },
      {
        id: 'rubber-plant',
        name: 'Rubber Plant',
        latin: 'Ficus elastica',
        price: 27.99,
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop&q=80',
        description: 'Deep burgundy leaves with a high-gloss finish.',
        badge: 'Sculptural',
      },
      {
        id: 'bamboo-palm',
        name: 'Bamboo Palm',
        latin: 'Chamaedorea seifrizii',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=400&auto=format&fit=crop&q=80',
        description: 'Top-ranked air purifier removing formaldehyde and benzene.',
        badge: 'Top Purifier',
      },
    ],
  },
];

function PlantCard({ plant }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const isInCart = cartItems.some(item => item.id === plant.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addItem(plant));
    }
  };

  return (
    <div className="plant-card">
      <div className="plant-img-wrap">
        <img src={plant.image} alt={plant.name} loading="lazy" />
        {plant.badge && <span className="plant-badge">{plant.badge}</span>}
      </div>
      <div className="plant-info">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-latin">{plant.latin}</p>
        <p className="plant-description">{plant.description}</p>
        <div className="plant-footer">
          <span className="plant-price">${plant.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn${isInCart ? ' added' : ''}`}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Added
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  return (
    <div className="product-page">
      <Navbar
        onHomeClick={onHomeClick}
        onPlantsClick={onPlantsClick}
        onCartClick={onCartClick}
      />
      <div className="product-page-hero">
        <h1>Our Plant Collection</h1>
        <p>Carefully curated plants to bring life and beauty into your home</p>
      </div>
      <div className="product-page-content">
        {plantCategories.map((category) => (
          <section key={category.id} className="category-section">
            <div className="category-header">
              <h2 className="category-label">{category.name}</h2>
              <div className="category-line" />
              <span className="category-count">{category.plants.length} plants</span>
            </div>
            <div className="plant-grid">
              {category.plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
