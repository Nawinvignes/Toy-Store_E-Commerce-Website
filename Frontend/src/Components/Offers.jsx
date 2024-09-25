import React, { useState, useEffect } from 'react';
import './Offers.css';

function Offers({ addToCart, addToWishlist }) {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Fetch offers data from your API endpoint
    fetch('http://localhost:8080/offers/get')
      .then(response => response.json())
      .then(data => setOffers(data))
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  const renderOffers = () => (
    <div className="offer-list">
      {offers.length > 0 ? (
        offers.map((offer) => (
          <div key={offer.id} className="offer-item">
            <img src={`/images/${offer.img}`} alt={offer.name} />
            <h3>{offer.name}</h3>
            <p className="description">{offer.description}</p>
            <div className="offer-details">
              <span className="price">${offer.price}</span>
              <button className="add-to-cart" onClick={() => addToCart(offer)}>Add to Cart</button>
              <button className="add-to-wishlist" onClick={() => addToWishlist(offer)}>Add to Wishlist</button>
            </div>
          </div>
        ))
      ) : (
        <p>No offers available</p>
      )}
    </div>
  );

  return (
    <div className="offers">
      <h1>Special Offers</h1>
      {renderOffers()}
    </div>
  );
}

export default Offers;
