
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/category')
      .then(result => {
        setCategories(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/auth/deletecategory/${categoryId}`);

      if (response.data.success) {
        message.success(response.data.message);
        setCategories(categories.filter(category => category._id !== categoryId));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting client:', error.message);
      message.error('Failed to delete client');
    }
  }
  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
      <Link to="/adminlogin/addcategory" className='btn btn-success mt-5'>Add Category</Link>
      <div>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._cid}>
                <td>{category.name}</td>
                <td>
                <Link to={`/adminlogin/editcategory/${category._id}`} className='btn btn-primary' style={{ marginRight: '10px' }}>Edit</Link>
                <button className='btn btn-danger' onClick={() => handleDelete(category._id)}>Delete</button>

                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
