import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './Home.css';
import { useNavigate } from 'react-router-dom';
// import 
function Home({ addToCart, addToWishlist, searchQuery, setLoggedIn}) {

  const [toys, setToys] = useState([]);
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const navigate = useNavigate();
  

  useEffect(() => {
   
    fetch('http://localhost:8080/toys/get')
      .then(response => response.json())
      .then(data => setToys(data))
      .catch(error => console.error('Error fetching toy data:', error));
  }, []);

  const filteredToys = toys.filter((toy) =>
    toy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = async (toy) => {
    try {
      const response = await axios.post('http://localhost:8080/api/carts', {
        name: toy.name,
        price: toy.price,
        img: toy.img,
        description: toy.description,
        user: { id: userId }
      });

      if (response.status === 200) {
        addToCart(toy);  // Add to cart locally if needed
        console.log('Toy added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding toy to cart:', error);
    }
  };

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
            <div className="review-stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <div className="toy-details">
              <span className="price">${toy.price}</span>
              <button className="add-to-cart" onClick={() => handleAddToCart(toy)}>Add to Cart</button>
              <button className="add-to-wishlist" onClick={() => addToWishlist(toy)}>Add to Wishlist</button>
            </div>
          </div>
        ))
      ) : (
        <p>No such toy found</p>
      )}
    </div>
  );

  return (
    <div className="home">
      {searchQuery ? (
        <>
          <h1>Search Results for "{searchQuery}"</h1>
          {renderToys(filteredToys)}
        </>
      ) : (
        <>
          <h1>Welcome to Joyville</h1>
          <p>Discover the best toys for every child!</p>

          <section className="featured-toys">
            <h2>Featured Toys</h2>
            {renderToys(toys.filter((toy) => toy.type === 'featured'))}
          </section>

          <section className="new-arrivals">
            <h2>New Arrivals</h2>
            {renderToys(toys.filter((toy) => toy.type === 'new'))}
          </section>

          <section className="best-sellers">
            <h2>Best Sellers</h2>
            {renderToys(toys.filter((toy) => toy.type === 'best'))}
          </section>

          <hr />
          <h1>Kids Age Groups</h1>
          <div className="toy-list">
            <div className="toy-item">
              <Link to={'/age-0-5'}>
              <img src='/images/ag1.jpg' alt="0-5 Years" />
              <h3>0-5 Years</h3>
              </Link>
            </div>
            <div className="toy-item">
              <Link to={'/age-5-9'}>
              <img src='/images/ag2.jpg' alt="5-9 Years" />
              <h3>5-9 Years</h3>
              </Link>
            </div>
            <div className="toy-item">
              <Link to={'/age-15-plus'}>
              <img src='/images/ag3.jpg' alt="15+ Years" />
              <h3>15+ Years</h3>
              </Link>
            </div>
          </div>

          <section className="gallery">
            <h2>Gallery</h2>
            <div className="gallery-images">
              <img src='/images/gal1.jpeg' alt="Gallery Image 1" />
              <img src='/images/gal2.jpeg' alt="Gallery Image 2" />
              <img src='/images/img3.jpg' alt="Gallery Image 3" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Home;
