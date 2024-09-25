import React, { useState, useEffect } from 'react';
import './Girls.css';

function Girls({ addToCart, addToWishlist }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch toys for girls from your API endpoint
    fetch('http://localhost:8080/toys/get')
      .then(response => response.json())
      .then(data => setToys(data))
      .catch(error => console.error('Error fetching toys:', error));
  }, []);

  const renderToys = (toyList) => (
    <div className="toy-list">
      {toyList.length > 0 ? (
        toyList.map((toy) => (
          <div key={toy.id} className="toy-item">
            <img src={`/images/${toy.img}`} alt={toy.name}  style={{width:"15rem",height:"8.5rem"}}/>
            <h3>{toy.name}</h3>
            <p className="description" style={{height:"2rem"}}>{toy.description}</p>
            <div className="review-stars">
              {Array.from({ length: 5 }, (_, i) => (
                <i key={i} className={i < Math.floor(toy.price / 10) ? "fas fa-star" : "far fa-star"}></i>
              ))}
            </div>
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
    <div className="girls">
      <h1>Toys for Girls</h1>

      <section className="top-picks">
        <h2>Top Picks for Girls</h2>
        {renderToys(toys.filter((toy) => toy.type === 'top-pickgirls'))}
      </section>

      <section className="popular-toys">
        <h2>Popular Toys for Girls</h2>
        {renderToys(toys.filter((toy) => toy.type === 'girls'))}
      </section>
    </div>
  );
}

export default Girls;
