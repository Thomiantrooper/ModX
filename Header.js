import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const authState = useSelector(state => state.auth);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      let productId;
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      switch (lowerCaseSearchTerm) {
        case 'bolt':
          productId = 2;
          break;
        case 'studds':
          productId = 3;
          break;
        case 'smk':
          productId = 4;
          break;
        case 'vega':
          productId = 1;
          break;
        case 'axor':
          productId = 4;
          break;
        default:
          // Handle other possible outcomes
          if (lowerCaseSearchTerm.includes('vega')) {
            productId = 1; // If the term contains 'vega', navigate to product 1
          } else {
            productId = null; // Navigate to search results page if term doesn't match
          }
          break;
      }
  
      if (productId !== null) {
        // Navigate to the corresponding product page
        window.location.href = `/product/${productId}`;
      } else {
        // Navigate to the search results page with the search term
        window.location.href = `/search?query=${searchTerm}`;
      }
    }
  };
    
  

  return (
    <header style={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1rem', margin: '0' }}>Free Shipping Over $100 & Free Returns | Hotline: <a href="tel:+94756792862">+94 756792862</a></h3>
          <p style={{ margin: '0' }}><h1>ModX.</h1></p>
        </div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', margin: '0', padding: '0' }}>
            <li style={{ marginRight: '20px' }}>
              <a href="/home" style={{ color: '#fff', textDecoration: 'none' }}>
                HOME
              </a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/shop" style={{ color: '#fff', textDecoration: 'none' }}>
                OUR_STORE
              </a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/blogpage" style={{ color: '#fff', textDecoration: 'none' }}>
                BLOGS
              </a>
            </li>
            
            
            <li style={{ marginRight: '20px' }}>
             {
              authState?.user === "" ?  <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
              MY-ACCOUNT
            </a>:  <a href="/profile" style={{ color: '#fff', textDecoration: 'none' }}>
              Welcome { authState?.user?.firstname}
          </a>
             }
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                LOGIN
              </a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/Cart" style={{ color: '#fff', textDecoration: 'none' }}>
                CART
              </a>
            </li>
            <li style={{ marginRight: '20px' }}>
              <a href="/enquiries" style={{ color: '#fff', textDecoration: 'none' }}>
                Inquries
              </a>
            </li>
            
            <div>
      <div class="navbar">
        <a href="/">Home</a>
        <a href="/AddTask">ADDReport</a>
        <a href="/employeedetails">Test Details</a>


      </div>

    </div>
    
          </ul>
        </nav>
      </div>
      {/* Search bar */}
      <div>
        <input 
          type="text" 
          placeholder="Search" 
          style={{ padding: '5px', marginRight: '5px' }} 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button 
          style={{ backgroundColor: '#fff', color: '#333', border: 'none', padding: '5px 10px' }}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      
    </header>
  );
};

export default Header;
