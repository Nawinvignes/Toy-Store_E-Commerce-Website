import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await axios.get('http://localhost:5000/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    }

    fetchReports();
  }, []);

  return (
    <div>
      <h2>Sales Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Date</th>
            <th>Total Sales</th>
            <th>Number of Orders</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{new Date(report.date).toLocaleDateString()}</td>
              <td>${report.totalSales.toFixed(2)}</td>
              <td>{report.numberOfOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReports;
