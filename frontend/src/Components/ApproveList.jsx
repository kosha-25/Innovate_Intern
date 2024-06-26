import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
const ApprovedList = () => {
  const [clients, setClients] = useState([]);
  const location = useLocation();
  const stateApprovedClients = location.state?.approvedClients || [];

  // Load approved clients from local storage if not passed through state
  const loadApprovedClients = () => {
    const storedClients = localStorage.getItem('approvedClients');
    return storedClients ? JSON.parse(storedClients) : [];
  };



  // Initialize clients state
  useEffect(() => {
    getClient();
    const initialClients = stateApprovedClients.length ? stateApprovedClients : loadApprovedClients();
    setClients(initialClients);
  }, [stateApprovedClients]);

  const getClient = async () => {
    axios.get('http://localhost:5000/auth/approved-list')
    .then(result => {
      setClients(result.data);
    })
    .catch(err => console.log(err));
  }

  const handleDelete = async (clientId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/client/deleteapproval/${clientId}`);

      if (response.data.success) {
        message.success(response.data.message);
        // Remove the deleted client from the state
        setClients(clients.filter(client => client._id !== clientId));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting client:', error.message);
      message.error('Failed to delete client');
    }
  };
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Approved Client List</h3>
      </div>
      {clients.length > 0 ? (
        <div className='mt-3'>
          <table className='table mt-3'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Image</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.address}</td>
                  <td>{client.image}</td>
                  <td>{client.category}</td>
                  <td>
                  <Link to={`/adminlogin/editnewclient/${client._id}`} className='btn btn-primary' style={{ marginRight: '10px' }}>Edit</Link>
                    <button className='btn btn-danger' onClick={() => handleDelete(client._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No approved client data available.</p>
      )}
    </div>
  );
};

export default ApprovedList;
