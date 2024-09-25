import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile({ user, onUpdate, onLogout }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [editing, setEditing] = useState(false);
  const [signedUser, setSignedUser] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:8080/userInfo/getId/${userId}`)
      .then(resp => {
        setSignedUser(resp.data);
      })
      .catch(error => {
        console.log("Error enna vendral: ", error);
      });
  }, [changed]);
  useEffect(() => {
    setFormData({
      email: user.email || '',
      username: user.username || '',
      password: '',
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUserData = {
        ...signedUser,
        email: formData.email,
        name: formData.username,
        ...(formData.password && { password: formData.password }),
      };
      console.log(updatedUserData);
      const updateResponse = await axios.put(`http://localhost:8080/userInfo/${userId}`, updatedUserData);
      setChanged(!changed);
      onUpdate(updateResponse.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData({
      email: user.email,
      username: user.username,
      password: '',
    });
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
        {!editing && <button className="edit-button" onClick={handleEditClick}>Edit Profile</button>}
      </div>
      <div className="profile-content">
        {editing ? (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">New Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <p>Email: {signedUser.email}</p>
            <p>Username: {signedUser.name}</p>
          </div>
        )}
      </div>
      {!editing && (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Profile;