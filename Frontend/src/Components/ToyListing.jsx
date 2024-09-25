import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import './ToyListing.css';

function ToyListing({ toy }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(toy);
  };

  const handleAddToWishlist = () => {
    addToWishlist(toy);
  };

  return (
    <div className="toy-item">
      <img src={`/images/${toy.img}`} alt={toy.name} className="toy-image" />
      <h3 className="toy-name">{toy.name}</h3>
      <p className="toy-price">${toy.price}</p>
      <button onClick={handleAddToCart} className="toy-button">Add to Cart</button>
      <button onClick={handleAddToWishlist} className="toy-button">Add to Wishlist</button>
    </div>
  );
}

export default ToyListing;
