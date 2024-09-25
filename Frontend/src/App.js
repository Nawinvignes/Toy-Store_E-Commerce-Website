// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import About from './Components/About';
import Boys from './Components/Boys';
import Girls from './Components/Girls';
import Profile from './Components/Profile';
import Footer from './Components/Footer';
import AdminFooter from './Components/AdminFooter';
import Navbar from './Components/Navbar';
import AdminNavbar from './Components/AdminNavbar';
import CartPage from './Components/CartPage';
import WishlistPage from './Components/WishlistPage';
import Notification from './Components/Notification';
import ToyDetails from './Components/ToyDetails';
import Payment from './Components/Payment';
import AdminDashboard from './Components/AdminDashboard';
import AdminProducts from './Components/AdminProducts';
import AdminFeedback from './Components/AdminFeedback';
import AdminReports from './Components/AdminReports';
import AdminOrders from './Components/AdminOrders';
import AdminUsers from './Components/AdminUsers';
import Toddlers from './Components/Toddlers';
import AdminLogin from './Components/AdminLogin';
import OrderConfirmation from './Components/OrderConfirmation';
import './App.css';
import AdminsManager from './Components/AdminsManager';
import MyOrders from './Components/MyOrders';
import Age0to5 from './Components/Age0to5';
import Age5to9 from './Components/Age5to9';
import Age15Plus from './Components/Age15Plus';
import Offers from './Components/Offers';
import Feedback from './Components/FeedBack';
import Review from './Components/Review';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ message: '', key: 0 });
  const [toys, setToys] = useState([]);
  

 
  useEffect(() => {
    
    fetch('http://localhost:8080/toys/get')
    .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error('Error fetching toys:', error));
  }, []);

  const addToCart = (item) => {
    if (loggedIn) {
      const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        const newCart = [...cart];
        newCart[existingItemIndex].quantity += 1;
        setCart(newCart);
      } else {
        setCart([...cart, { ...item, quantity: 1 }]);
      }
      setNotification({ message: 'Added to cart', key: Date.now() });
    } else {
      alert('Please sign in or register to add items to the cart.');
    }
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  };

  const addToWishlist = (item) => {
    if (loggedIn) {
      setWishlist([...wishlist, item]);
      setNotification({ message: 'Added to wishlist', key: Date.now() });
    } else {
      alert('Please sign in or register to add items to the wishlist.');
    }
  };

  const removeFromWishlist = (index) => {
    const newWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(newWishlist);
  };

  const moveToCart = (index) => {
    const item = wishlist[index];
    addToCart(item);
    removeFromWishlist(index);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const clearNotification = () => {
    setNotification({ message: '', key: Date.now() });
  };

  return (
    <Router>
      <div>
        {user?.role === 'admin' ? (
          <AdminNavbar loggedIn={loggedIn} onLogout={handleLogout} setLoggedIn = {setLoggedIn} />
        ) : (    <Navbar loggedIn={loggedIn} cart={cart} wishlist={wishlist} onSearch={handleSearch} onLogout={handleLogout} setLoggedIn = {setLoggedIn}/>
        )}
        {notification.message && (
          <Notification key={notification.key} message={notification.message} clearNotification={clearNotification} />
        )}
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} addToWishlist={addToWishlist} searchQuery={searchQuery} setLoggedIn = {setLoggedIn}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/boys" element={<Boys addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/girls" element={<Girls addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/toddlers" element={<Toddlers addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/review" element={loggedIn ? <Review addToCart={addToCart} addToWishlist={addToWishlist} /> : <Navigate to="/"/>} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />} />
          <Route path="/admin-login" element={<AdminLogin setLoggedIn={setLoggedIn} setUser={setUser} />} />
          <Route path="/register" element={<Register setLoggedIn={setLoggedIn} setUser={setUser} />} />
          <Route path="/profile" element={loggedIn ? <Profile user={user} onUpdate={setUser} onLogout={handleLogout} /> : <Navigate to="/" replace />} />
          <Route path="/cart" element={loggedIn ? <CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} /> : <Navigate to="/" replace />} />
          <Route path="/wishlist" element={loggedIn ? <WishlistPage wishlist={wishlist} removeFromWishlist={removeFromWishlist} moveToCart={moveToCart} /> : <Navigate to="/" replace />} />
          <Route path="/toys/:id" element={<ToyDetails toys={toys} addToCart={addToCart} addToWishlist={addToWishlist} />} />
          <Route path="/payment" element={loggedIn ? <Payment cart={cart} /> : <Navigate to="/login" replace />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/age-0-5" element={<Age0to5 addToCart={addToCart} addToWishlist={addToWishlist} searchQuery={searchQuery}/>}/>
          <Route path="/age-5-9" element={<Age5to9 addToCart={addToCart} addToWishlist={addToWishlist} searchQuery={searchQuery}/>}/>
          <Route path="/age-15-plus" element={<Age15Plus addToCart={addToCart} addToWishlist={addToWishlist} searchQuery={searchQuery}/>}/>
          <Route path="/offers" element={<Offers addToCart={addToCart} addToWishlist={addToWishlist} searchQuery={searchQuery}/>}/>
          <Route path="/my-orders" element={loggedIn ? <MyOrders /> : <Navigate to="/login" replace />} />
          <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} />
          <Route path="/admin/products" element={user?.role === 'admin' ? <AdminProducts /> : <Navigate to="/" replace />} />
          <Route path="/admin/feedback" element={user?.role === 'admin' ? <AdminFeedback /> : <Navigate to="/" replace />} />
          <Route path="/admin/reports" element={user?.role === 'admin' ? <AdminReports /> : <Navigate to="/" replace />} />
          <Route path="/admin/orders" element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/" replace />} />
          <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUsers /> : <Navigate to="/" replace />} />
          <Route path="/admin/admins" element={user?.role === 'admin' ? <AdminsManager /> : <Navigate to="/" replace />} />
          {loggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
        </Routes>
        {user?.role === 'admin' ? <AdminFooter /> : <Footer />}
      </div>
    </Router>
  );
}

export default App;