import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { message } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase.jsx';
import { useState, useEffect } from 'react';


const EditNewClient = () => {

  const {id} = useParams()
    const navigate = useNavigate()
   const [categories, setCategories] = useState([]);
    const [client, setClient] = useState({
        name: '',
        email: '',
        address: '',
        category: '' // Ensure category field is included
      });

      useEffect(() => {
        // Fetch categories from backend
        axios.get('http://localhost:5000/auth/category')
          .then(result => {
            setCategories(result.data);
          })
          .catch(error => {
            console.error('Error fetching categories:', error.message);
            message.error('Failed to load categories');
          });

          axios.get(`http://localhost:5000/auth/approved-list/${id}`)
          .then(result => {

           const clientData = result.data;
            setClient({
                ...client,
                name: clientData.name,
                email: clientData.email,
                address: clientData.address,
            })
          }).catch(err => console.log(err))
      }, []);


    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios.put(`http"//localhost:5000/auth/client/${id}`, client)
    //     .then(result => {
    //         console.log(result.data)
    //     }).catch(err => console.log(err.message))
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.put(`http://localhost:5000/auth/approved-list/${id}`, client);
      
          if (response.data.success) {
            message.success(response.data.message);
            // Redirect or navigate to another page after successful update
            navigate("/adminlogin/approved-list");
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          console.error('Error updating client:', error.message);
          message.error('Failed to update client');
        }
      };
      
  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
    <div className='p-3 rounded w-50 border'>
      <h3 className='text-center'>Edit Client</h3>
      <form className='row g-1' onSubmit={handleSubmit}>
        <div className='col-12'>
          <label htmlFor="inputName" className='form-label'>
            Name
          </label>
          <input
            type="text"
            className='form-control rounded-0'
            id='inputName'
            placeholder='Enter Name'
            value={client.name}
            onChange={(e) => setClient({ ...client, name: e.target.value })}
          />
        </div>

        <div className='col-12'>
          <label htmlFor="inputEmail" className='form-label'>
            Email
          </label>
          <input
            type="email"
            className='form-control rounded-0'
            id='inputEmail4'
            placeholder='Enter Email'
            autoComplete='off'
            value={client.email}
            onChange={(e) => setClient({ ...client, email: e.target.value })}
          />
        </div>

    
        <div className='col-12'>
          <label htmlFor="inputAddress" className='form-label'>
            Address
          </label>
          <input
            type="text"
            className='form-control rounded-0'
            id='inputAddress'
            placeholder='1234 Main St'
            autoComplete='off'
            value={client.address}
            onChange={(e) => setClient({ ...client, address: e.target.value })}
          />
        </div>

        <div className='col-12'>
          <label htmlFor="inputCategory" className='form-label'>
            Category
          </label>
          <select
            name="category"
            id="category"
            className='form-select'
            onChange={(e) => setClient({ ...client, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className='col-12'>
          <button className='btn btn-primary w-100 mt-3'>Edit Client</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditNewClient
