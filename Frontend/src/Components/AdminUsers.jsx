import React, { useEffect, useState } from 'react';
import './AdminUsers.css';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        console.log('Fetching users...');
        const response = await fetch('http://localhost:8080/userInfo/getUsers'); 
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Check what is fetched
        setUsers(data || []);
        setFilteredUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const searchResults = users.filter(user => 
      user.id.toString().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(searchResults);
  }, [searchQuery, users]);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/userInfo/${id}`, { method: 'DELETE' });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const handleBlock = async (id, isBlocked) => {
    try {
      await fetch(`http://localhost:8080/userInfo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ blocked: !isBlocked })
      });
      setUsers(users.map(user => user.id === id ? { ...user, blocked: !isBlocked } : user));
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
      setError('Error blocking/unblocking user');
    }
  };

  return (
    <div className="admin-user">
      <h2>Manage Users</h2>
      {error && <p className="error">{error}</p>}
      
      <input 
        type="text" 
        placeholder="Search by ID or Username" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        className="search-input"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleBlock(user.id, user.blocked)}>
                    {user.blocked ? 'Unblock' : 'Block'}
                  </button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
