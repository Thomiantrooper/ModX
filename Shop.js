import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { getProducts } from '../features/products/productSlice';

const Shop = ({ userRole }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const products = useSelector(state => state.products.products);

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>&#9733;</span>); // Full star
    }
    if (halfStar === 1) {
      stars.push(<span key={'half-star'}>&#9733;&#xFE0E;</span>); // Half star
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`}>&#9734;</span>); // Empty star
    }
    return stars;
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
        <h2 style={{ gridColumn: '1 / -1' }}>Helmet Products</h2>
        {products.map(product => (
          <Link 
            key={product._id} 
            to={`/product/4`} // Navigate to product4.js page
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div 
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>{product.title}</h3>
              <p>Slug: {product.slug}</p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>
                {/* Render star rating */}
                {renderStarRating(product.totalRating)}
              </p>
              <p>Quantity: {product.quantity}</p>
              {/* Render edit button only if user is admin */}
              {userRole === 'admin' && (
                <button style={{ marginTop: '10px' }}>Edit</button>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div style={{ padding: '20px' }}>
        <h2>Our New Trends</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/images/Axor.webp" alt="Axor Gif" style={{ width: '400px', marginRight: '20px' }} />
          <img src="/images/New.gif" alt="New Gif" style={{ width: '400px' }} />
        </div>
      </div>
    </div>
  );
}

export default Shop;
