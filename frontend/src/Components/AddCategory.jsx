import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import axios  from 'axios'
const AddCategory = () => {
  
  const [name, setName] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:5000/auth/addcategory',
        {name}
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/adminlogin/category");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  } 
 

  return (
    <div className='d-flex justify-content-center align-items-center h-75'>
     <div className='p-3 rounded w-25 border'>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="category"><strong>Category:</strong></label>
            <input type="text" name="category"  placeholder='Enter Category'
              onChange={(e)=> setName(e.target.value)}className='form-control rounded-0' required/>
        </div>

        <button className='btn btn-success w-100 rounded-0 mb-2'>Add Category</button>
      </form>
    </div>
    </div>
  )
}

export default AddCategory
