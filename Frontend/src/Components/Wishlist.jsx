import React from 'react';

function Wishlist({ wishlist }) {
  return (
    <div className="wishlist-content">
      <h3>Your Wishlist</h3>
      {wishlist.length > 0 ? (
        wishlist.map((item, index) => (
          <div key={index} className="wishlist-item">
            <img src={item.img} alt={item.title} />
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;
