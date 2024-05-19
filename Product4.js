import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Product.css';

const Product4 = () => {
  // State to track selected product
  const [selectedProduct, setSelectedProduct] = useState(null);
  // State to track selected helmet
  const [selectedHelmet, setSelectedHelmet] = useState(null);
  // State to track selected size
  const [selectedSize, setSelectedSize] = useState(null);
  // State to track quantity
  const [quantity, setQuantity] = useState(1);

  // Function to handle selecting a product
  const handleSelectProduct = () => {
    setSelectedProduct(true);
    setSelectedHelmet(null); // Deselect helmet if any
  };

  // Function to handle selecting a helmet
  const handleSelectHelmet = (helmetId) => {
    setSelectedProduct(false); // Deselect product if any
    setSelectedHelmet(helmetId);
  };

  // Function to handle selecting a size
  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  // Function to handle increasing quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decreasing quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Function to handle adding the selected product or helmet to the cart
  const handleAddToCart = () => {
    // Implement your logic to add the selected product or helmet to the cart
    // For example:
    if (selectedProduct) {
      console.log(`Adding View Bunny to cart with quantity ${quantity}`);
    } else if (selectedHelmet) {
      console.log(`Adding helmet ${selectedHelmet} to cart with size ${selectedSize} and quantity ${quantity}`);
    }
  };

  // Function to handle paying now
  const handlePayNow = () => {
    // Implement your logic to handle paying now
    console.log('Pay Now clicked');
  };

  return (
    <div className="product-container">
      <div className="helmets-container">
        <div className="helmet-item" onClick={() => handleSelectHelmet(1)}>
          <img src="/images/smk1.jpeg" alt="Helmet 10" className={selectedHelmet === 1 ? 'selected' : ''} />
        </div>
        <div className="helmet-item" onClick={() => handleSelectHelmet(2)}>
          <img src="/images/smk2.jpeg" alt="Helmet 11" className={selectedHelmet === 2 ? 'selected' : ''} />
        </div>
        <div className="helmet-item" onClick={() => handleSelectHelmet(3)}>
          <img src="/images/smk3.jpeg" alt="Helmet 12" className={selectedHelmet === 3 ? 'selected' : ''} />
        </div>
      </div>
      <div className="description-container">
        <div className="description-content">
          <h2>Details:</h2>
          <p>SMK Helmets embody the perfect fusion of style and safety. Crafted with precision engineering and high-quality materials, these helmets offer unparalleled protection without compromising on comfort. With sleek designs and innovative features like multi-density EPS liners and efficient ventilation systems, SMK Helmets ensure a safe and stylish riding experience for all motorcycle enthusiasts. Whether cruising through city streets or embarking on long journeys, SMK Helmets are the trusted companion for riders seeking both protection and style on the road. </p>
          <h2>Price: Rs.19,000</h2>
          <h3>Quality: High quality material</h3>
          <h3>Manufacture Process: Advanced manufacturing techniques</h3>
          <h3>Specifications:</h3>
          <ul>
            <li><strong>Brand:</strong> SMK</li>
            <li><strong>SKU:</strong> 170200954_LK-1119067546</li>
            <li><strong>Shell Material:</strong> Polycarbonate Plastic</li>
            <li><strong>Availability of Sun Visor:</strong> Yes</li>
            <li><strong>Availability of Pin-Lock:</strong> No</li>
            <li><strong>Quality Certification:</strong> DOT</li>
          </ul>
          <h3>Please select size:</h3>
          <div className="size-buttons">
            <button onClick={() => handleSelectSize('Small')} className={selectedSize === 'Small' ? 'selected' : ''}>Small</button>
            <button onClick={() => handleSelectSize('Medium')} className={selectedSize === 'Medium' ? 'selected' : ''}>Medium</button>
            <button onClick={() => handleSelectSize('Large')} className={selectedSize === 'Large' ? 'selected' : ''}>Large</button>
          </div>
        </div>
      </div>
      <div className="quantity-container">
        <label htmlFor="quantity">Quantity:</label>
        <div className="quantity-control">
          <button className="quantity-button" onClick={decreaseQuantity}>-</button>
          <input type="number" id="quantity" value={quantity} readOnly />
          <button className="quantity-button" onClick={increaseQuantity}>+</button>
        </div>
      </div>
      <div className="button-container">
        <Link to="/cart">
          <button onClick={handleAddToCart} disabled={!selectedHelmet || !selectedSize}>Add to Cart</button>
        </Link>
        {/* Use Link to navigate to payment page */}
        <Link to="/payment">
          <button onClick={handlePayNow} disabled={!selectedProduct && !selectedHelmet} style={{ marginLeft: '10px' }}>Pay Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Product4;
