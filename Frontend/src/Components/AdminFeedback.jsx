import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminFeedback.css';

function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of feedback items per page

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const sampleFeedback = [
          { id: 1, user: 'Alice', message: 'Great service and fast delivery!', date: '2024-07-28', status: 'Resolved' },
          { id: 2, user: 'Bob', message: 'The product quality is excellent.', date: '2024-07-25', status: 'Pending' },
          { id: 3, user: 'Charlie', message: 'Had a small issue with the order, but support was helpful.', date: '2024-07-22', status: 'Resolved' },
          { id: 4, user: 'Diana', message: 'Not satisfied with the product. It arrived damaged.', date: '2024-07-20', status: 'Unresolved' },
          { id: 5, user: 'Edward', message: 'Quick and easy shopping experience. Will buy again.', date: '2024-07-18', status: 'Resolved' },
          { id: 6, user: 'Fiona', message: 'The item did not match the description.', date: '2024-07-15', status: 'Pending' },
          { id: 7, user: 'George', message: 'Love the variety of products available.', date: '2024-07-10', status: 'Resolved' },
          { id: 8, user: 'Hannah', message: 'Customer service was not very responsive.', date: '2024-07-08', status: 'Unresolved' },
          { id: 9, user: 'Ian', message: 'Shipping was slower than expected.', date: '2024-07-05', status: 'Resolved' },
          { id: 10, user: 'Jane', message: 'Overall a positive experience. Would recommend.', date: '2024-07-01', status: 'Resolved' }
        ];
        setFeedback(sampleFeedback);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    }

    fetchFeedback();
  }, []);

  const filteredFeedback = feedback.filter(fb =>
    fb.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fb.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedback = filteredFeedback.slice(indexOfFirstFeedback, indexOfLastFeedback);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (field) => {
    const sortedFeedback = [...feedback].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setFeedback(sortedFeedback);
  };

  return (
    <div className="admin-feedback">
      <h2>User Feedback</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search feedback..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="sort-container">
        <button onClick={() => handleSort('date')}>Sort by Date</button>
        <button onClick={() => handleSort('user')}>Sort by User</button>
      </div>
      {currentFeedback.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentFeedback.map(fb => (
                <tr key={fb.id}>
                  <td>{fb.id}</td>
                  <td>{fb.user}</td>
                  <td>{fb.message}</td>
                  <td>{new Date(fb.date).toLocaleDateString()}</td>
                  <td>{fb.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredFeedback.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
}

export default AdminFeedback;
