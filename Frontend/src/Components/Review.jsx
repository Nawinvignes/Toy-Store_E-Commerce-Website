import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Review.css';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/reviews/all')
      .then(response => {
        console.log(response.data[0]);
        setReviews(response.data);
        console.log(reviews.length);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  return (
    <div className="review-container">
      <h2>User Reviews</h2>
      <div className="review-content">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="review-item">
              <h3>{review.username}</h3>
              <p>{review.review}</p>
              {/* <div className="review-stars">
                {Array(review.rating).fill(<i className="fas fa-star"></i>)}
                {Array(5 - review.rating).fill(<i className="far fa-star"></i>)}
              </div> */}
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default Review;