import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminsManager.css';

function AdminsManager() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ email: '', username: '', password: '' });

  useEffect(() => {
    // Fetch the list of admins
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:8080/adminauth/admins');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleAddAdmin = async (event) => {
    event.preventDefault();
    try {
      const newAdminData = {
        ...newAdmin,
        role: 'admin'
      };

      // Add new admin to the server
      const response = await axios.post('http://localhost:8080/adminauth/register', newAdminData);
      if (response.data === 'saved') 
      {
        setAdmins([...admins, newAdminData]);
        setNewAdmin({ email: '', username: '', password: '' });
       } else 
       {
        console.error('Admin already exists');
       }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleDeleteAdmin = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/adminauth/delete/${id}`);
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  return (
    <div className="manage-admins admin-user">
      <h2>Manage Admins</h2>
      <form onSubmit={handleAddAdmin}>
        <input
          type="email"
          name="email"
          value={newAdmin.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="username"
          value={newAdmin.username}
          onChange={handleInputChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={newAdmin.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
        <button type="submit">Add Admin</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.username}</td>
              <td>{admin.email}</td>
              <td>
                <button onClick={() => handleDeleteAdmin(admin.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminsManager;
