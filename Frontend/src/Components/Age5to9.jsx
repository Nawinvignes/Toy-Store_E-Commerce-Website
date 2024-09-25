import React, { useState, useEffect } from 'react';
import './Age5to9.css';

function Age5to9({ addToCart, addToWishlist }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch toys for the 5-9 age group from your API endpoint
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
            <img src={`/images/${toy.img}`} alt={toy.name} style={{width:"15rem",height:"8.5rem"}}/>
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
    <div className="age5to9">
      <h1>Toys for 5-9 Years</h1>
      {renderToys(toys)}
    </div>
  );
}

export default Age5to9;
