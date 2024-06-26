import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

const Role = () => {
  const [clients, setClients] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getClient();
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/client/getuserdata", // Adjust the URL if necessary
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      setUserData(res?.data.data);
      fetchClients(res?.data.data._id); // Fetch clients for the current user
    } catch (error) {
      console.log(error);
    }
  };

  const getClient = async () => {
    axios.get('http://localhost:5000/client/role')
    .then(result => {
      setClients(result.data);
    })
    .catch(err => console.log(err));
  }

  const fetchClients = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/client/role/${userId}`);
      setClients(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleDelete = async (clientId) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/client/deletenewclient/${clientId}`);

  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       // Remove the deleted client from the state
  //       setClients(clients.filter(client => client._id !== clientId));
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting client:', error.message);
  //     message.error('Failed to delete client');
  //   }
  // };

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Role List</h3>
      </div>
      <Link to="/clientdashboard/selectrole" className='btn btn-success mt-5'>Select Role</Link>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Role;
