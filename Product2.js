import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import './Product.css';

const Product2 = () => {
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
          <img src="/images/bolt1.jpg" alt="Helmet 4" className={selectedHelmet === 1 ? 'selected' : ''} />
        </div>
        <div className="helmet-item" onClick={() => handleSelectHelmet(2)}>
          <img src="/images/bolt2.jpg" alt="Helmet 5" className={selectedHelmet === 2 ? 'selected' : ''} />
        </div>
        <div className="helmet-item" onClick={() => handleSelectHelmet(3)}>
          <img src="/images/bolt3.jpeg" alt="Helmet 6" className={selectedHelmet === 3 ? 'selected' : ''} />
        </div>
      </div>
      <div className="description-container">
        <div className="description-content">
          <h2>Details:</h2>
          <p>Description:Bolt Helmets seamlessly blend safety and style, offering riders top-notch protection without sacrificing aesthetics. Constructed with high-impact ABS material shells and aerodynamic designs,
           these helmets ensure unparalleled safety on the road. Featuring removable and washable linings for comfort and hygiene, along with advanced ventilation systems for optimal airflow, Bolt Helmets prioritize rider comfort. With certifications from regulatory bodies like DOT, they assure quality and compliance. Expressive in design and equipped with innovative features like quick-release buckles and UV-resistant visors,
           Bolt Helmets stand as the epitome of safety gear, empowering riders to embark on their journeys with confidence and flair. </p>
          <h2>Price: Rs.15,000</h2>
          <h3>Quality: High quality material</h3>
          <h3>Manufacture Process: Advanced manufacturing techniques</h3>
          <h3>Specifications:</h3>
          <ul>
            <li><strong>Brand:</strong> Bolt embarked with Vega</li>
            <li><strong>SKU:</strong> 170200954_LK-1119067564</li>
            <li><strong>Shell Material:</strong> Polycarbonate Plastic</li>
            <li><strong>Availability of Sun Visor:</strong> Yes</li>
            <li><strong>Availability of Pin-Lock:</strong> No</li>
            <li><strong>Quality Certification:</strong> DOT1</li>
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

export default Product2;
