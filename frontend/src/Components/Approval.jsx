import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const Approval = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  // Load approved clients from local storage
  const loadApprovedClients = () => {
    const storedClients = localStorage.getItem('approvedClients');
    return storedClients ? JSON.parse(storedClients) : [];
  };

  const [approvedClients, setApprovedClients] = useState(loadApprovedClients);

  useEffect(() => {
    axios.get('http://localhost:5000/client/role')
      .then(result => {
        setClients(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleApprove = (client) => {
    axios.put(`http://localhost:5000/client/approve/${client._id}`)
      .then(response => {
        message.success('Client approved successfully!');
        const updatedApprovedClients = [...approvedClients, client._id];
        setApprovedClients(updatedApprovedClients);
        localStorage.setItem('approvedClients', JSON.stringify(updatedApprovedClients)); // Update local storage
      })
      .catch(error => {
        message.error('Error approving client.');
        console.log(error);
      });
  };

  const navigateToApprovedList = () => {
    navigate('/adminlogin/approved-list', { state: { approvedClients } });
  };

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Role List</h3>
      </div>
      <div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Image</th>
              <th>Category</th>
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
                  {!approvedClients.includes(client._id) && (
                    <button 
                      className='btn btn-primary' 
                      onClick={() => handleApprove(client)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='btn btn-success mt-3' onClick={navigateToApprovedList}>
        View Approved Clients
      </button>
    </div>
  );
}

export default Approval;
