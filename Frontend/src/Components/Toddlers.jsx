import React, { useState, useEffect } from 'react';
import './Boys.css';
import action1 from './Assets/ag1.jpg';
import action2 from './Assets/ag2.jpg';
import action3 from './Assets/ag3.jpg';

function Boys({ addToCart, addToWishlist }) {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    // Fetch toys for boys from your API endpoint
    fetch('http://localhost:8080/toys/get')
      .then(response => response.json())
      .then(data => setToys(data))
      .catch(error => console.error('Error fetching toys:', error));
  }, []);

  return (
    <div className="boys">
      <h1>Featured Toys for Toddlers</h1>
      
      <section className="featured-toys">
        <h2>Top Picks</h2>
        <div className="toy-list">
          {toys.slice(0, 5).map((toy) => (
            <div key={toy.id} className="toy-item">
              <img src={`/images/${toy.img}`} alt={toy.name} style={{width:"15rem",height:"8.5rem"}}/>
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
          ))}
        </div>
      </section>

      <section className="popular-toys">
        <h2>Popular Toys</h2>
        <div className="toy-list">
          {toys.slice(3).map((toy) => (
            <div key={toy.id} className="toy-item">
              <img src={`/images/${toy.img}`} alt={toy.name} style={{width:"15rem",height:"8.5rem"}}/>
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
          ))}
        </div>
      </section>

      <section className="toy-categories">
        <h2>Categories</h2>
        <div className="category-list">
          <div className="category-item">
            <img src={action1} alt="Action Figures" />
            <h3>Action Figures</h3>
            <p className="description">Popular characters for imaginative play.</p>
          </div>
          <div className="category-item">
            <img src={action2} alt="Building Sets" />
            <h3>Building Sets</h3>
            <p className="description">Constructive fun with various building kits.</p>
          </div>
          <div className="category-item">
            <img src={action3} alt="Vehicles" />
            <h3>Vehicles</h3>
            <p className="description">Toy cars, trucks, and more for racing adventures.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Boys;
