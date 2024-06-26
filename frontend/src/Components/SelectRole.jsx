import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const SelectRole = () => {
  const [categories, setCategories] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();

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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/clientdashboard/applyrole', { state: { role: selectedRole } });
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
      <div className='p-3 rounded w-25 border'>
        <h2>Select Role</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="role"><strong>Role:</strong></label>
            <select
              name="category"
              id="category"
              className='form-select'
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
          <button className='btn btn-success w-100 rounded-0 mb-2'>Apply For Role</button>
        </form>
      </div>
    </div>
  );
};

export default SelectRole;
