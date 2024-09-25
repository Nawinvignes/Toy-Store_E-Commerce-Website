import React, { useState, useEffect } from 'react';
import './AdminProducts.css'; // Import CSS for styling

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', img: '', description: '', type: '' });
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    // Fetch the products from the backend
    fetch("http://localhost:8080/toys/get")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleInputChange = (e) => {
    if (editProduct) {
      setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    } else {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    }
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.img && newProduct.description && newProduct.type) {
      fetch("http://localhost:8080/toys/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
      .then(response => response.json())
      .then(data => {
        setProducts([data, ...products]); // Prepend the new product to the beginning of the array
        setNewProduct({ name: '', price: '', img: '', description: '', type: '' });
      })
      .catch(error => console.error('Error adding product:', error));
    } else {
      alert('Please fill in all fields.');
    }
  };

  const updateProduct = () => {
    if (editProduct.name && editProduct.price && editProduct.img && editProduct.description && editProduct.type) {
      fetch(`http://localhost:8080/toys/${editProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProduct),
      })
      .then(response => response.json())
      .then(data => {
        setProducts(products.map(product => (product.id === editProduct.id ? data : product)));
        setEditProduct(null);
      })
      .catch(error => console.error('Error updating product:', error));
    } else {
      alert('Please fill in all fields.');
    }
  };

  const removeProduct = (id) => {
    fetch(`http://localhost:8080/toys/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setProducts(products.filter(product => product.id !== id));
    })
    .catch(error => console.error('Error removing product:', error));
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>
      <div className="add-product-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editProduct ? editProduct.name : newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={editProduct ? editProduct.price : newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="img"
          placeholder="Image URL"
          value={editProduct ? editProduct.img : newProduct.img}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={editProduct ? editProduct.description : newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={editProduct ? editProduct.type : newProduct.type}
          onChange={handleInputChange}
        />
        {editProduct ? (
          <button onClick={updateProduct}>Update Product</button>
        ) : (
          <button onClick={addProduct}>Add Product</button>
        )}
      </div>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Type: {product.type}</p>
            </div>
            <div className="product-buttons">
              <button onClick={() => handleEditClick(product)}>Edit</button>
              <button onClick={() => removeProduct(product.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;
