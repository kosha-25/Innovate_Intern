
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/category')
      .then(result => {
        setCategories(result.data);
      })
      .catch(err => console.log(err));
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._cid}>
                <td>{category.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
