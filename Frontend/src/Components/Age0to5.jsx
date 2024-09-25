import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Age0to5.css';

function Age0to5({ addToCart, addToWishlist }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch toys for the 0-5 age group from your API endpoint
    fetch('http://localhost:8080/toys/get')
      .then(response => response.json())
      .then(data => setToys(data.filter(toy => toy.type === 'featured')))
      .catch(error => console.error('Error fetching toys:', error));
  }, []);

  const renderToys = (toyList) => (
    <div className="toy-list">
      {toyList.length > 0 ? (
        toyList.map((toy) => (
          <div key={toy.id} className="toy-item">
            <Link to={`/toys/${toy.id}`}>
              <img src={`/images/${toy.img}`} alt={toy.name} style={{width:"15rem",height:"8.5rem"}}/>
            </Link>
            <h3>{toy.name}</h3>
            <p className="description" style={{height:"2rem"}}>{toy.description}</p>
            <div className="toy-details">
              <span className="price">${toy.price}</span>
              <button className="add-to-cart" onClick={() => addToCart(toy)}>Add to Cart</button>
              <button className="add-to-wishlist" onClick={() => addToWishlist(toy)}>Add to Wishlist</button>
            </div>
          </div>
        ))
      ) : (
        <p>No toys found</p>
      )}
    </div>
  );

  return (
    <div className="age0to5">
      <h1>Toys for 0-5 Years</h1>
      {renderToys(toys)}
    </div>
  );
}

export default Age0to5;