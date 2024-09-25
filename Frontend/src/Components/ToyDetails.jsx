import React from 'react';
import { useParams } from 'react-router-dom';
import './ToyDetails.css';

function ToyDetails({ toys, addToCart, addToWishlist }) {
  const { id } = useParams();
  const toyId = parseInt(id, 10); // Convert id to number with base 10

  // Check if toys is defined and is an array
  if (!Array.isArray(toys)) {
    return <div>Invalid data</div>;
  }

  // Find the toy by id
  const toy = toys.find(toy => toy.id === toyId);

  // Handle case where toy is not found
  if (!toy) {
    return <div>Toy not found</div>;
  }

  return (
    <div className="toy-details-page">
        <h1>{toy.name}</h1>
      <div className="makeit">
        <img src={`/images/${toy.img}`} alt={toy.name} onError={(e) => e.target.src = '/images/placeholder.jpg'} />
        <div className="makeit2">
          <p className="description">{toy.description}</p>
          <p className="price">${toy.price.toFixed(2)}</p>
          <button className="add-to-cart" onClick={() => addToCart(toy)}>Add to Cart</button>
          <button className="add-to-wishlist" onClick={() => addToWishlist(toy)}>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
}

export default ToyDetails;
