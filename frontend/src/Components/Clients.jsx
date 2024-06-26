import React, {useState, useEffect}  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { message } from 'antd';
const Clients = () => {

  const [clients, setClients] = useState([]);
 const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/auth/client')
      .then(result => {
        setClients(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (clientId) => { // Use clientId instead of _id
    try {
      const response = await axios.delete(`http://localhost:5000/auth/deleteclient/${clientId}`);

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
    <div className='px-5 mt-3'>
      <div className='d-flex justify-content-center'>
        <h3>Client List</h3>

      </div>
      <Link to="/adminlogin/addclient" className='btn btn-success mt-5'>Add Client</Link>
      <div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
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
                <td>{client.salary}</td>
                <td>{client.address}</td>
                <td>{client.image}</td>
                <td>{client.category}</td>
  
                <td>
                  <Link to={`/adminlogin/editclient/${client._id}`} className='btn btn-primary'>Edit</Link>
                  <button className='btn btn-danger mt-3' onClick={() => handleDelete(client._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Clients
