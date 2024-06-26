import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryForm = () => {
  const { id } = useParams(); // Ensure you have this hook correctly imported and used
  const [category, setCategory] = useState({ name: '' });
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/category/${id}`);
        if (response.data.success) {
          setCategory({ name: response.data.category.name });
        } else {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching category:', error.message);
        message.error('Failed to fetch category');
      }
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/auth/category/${id}`, category);

      if (response.data.success) {
        message.success(response.data.message);
        navigate("/adminlogin/category");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating category:', error.message);
      message.error('Failed to update category');
    }
  };

  return (

    <div className='d-flex justify-content-center align-items-center h-75'>
     <div className='p-3 rounded w-25 border'>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="category"><strong>Category:</strong></label>
            <input type="text" name="category"  placeholder='Enter Category'
            value={category.name}
             onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className='form-control rounded-0' required/>
        </div>

        <button className='btn btn-success w-100 rounded-0 mb-2'>Update Category</button>
      </form>
    </div>
    </div>
  );
};

export default CategoryForm;
