import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Importing external CSS file

const products = [
  {
    id: 1,
    name: 'Vega Helmet',
    price: 'RS.18,000',
    image: 'bunny.jpg',
    type: 'Helmets',
  },
  {
    id: 2,
    name: 'Bolt helmet',
    price: 'Rs.15,000',
    image: 'bolt.jpg',
    type: 'Helmets',
  },
  {
    id: 3,
    name: 'Studds helmet',
    price: 'Rs.20,000',
    image: 'super.jpg',
    type: 'Helmets',
  },
  {
    id: 4,
    name: 'SMK Helmet',
    price: 'Rs.19,000',
    image: 'smk.jpg',
    type: 'Helmets',
  },
  {
    id: 5,
    name: 'AXOR Helmet',
    price: 'Rs.19,000',
    image: 'axor.jpg',
    type: 'Helmets',
  },
];

const productCategories = ['VEGA', 'BOLT', 'STUDDS', 'SMK', 'AXOR'];

function Home() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filterProducts = (category) => {
    setActiveCategory(category);
  };

  const getProductsToDisplay = () => {
    if (activeCategory === 'ALL') {
      return products;
    }

    return products.filter((product) => product.type === activeCategory);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Our Popular Products</h1>
      </header>

      <main>
        <section className="categories">
          {productCategories.map((category) => (
            <Link
              key={category}
              to={`/${category}`} // Assuming the category will be used in the product page route
              className={`category-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => filterProducts(category)}
            >
              {category}
            </Link>
          ))}
        </section>

        <section className="products">
          {getProductsToDisplay().map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="product-link">
              <img
                src={`/images/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">{product.price}</p>
              </div>
            </Link>
          ))}
        </section>

        <section className="videos">
          <div className="video">
            <h2>New Product Video 1</h2>
            <video src="/images/helmet.mp4" autoPlay muted playsInline className="video-player" />
          </div>
          <div className="video">
            <h2>New Product Video 2</h2>
            <video src="/images/Studds.mp4" autoPlay muted playsInline className="video-player" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
