import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

    
  
const ClientSignUp = () => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
      });
    
      const navigate = useNavigate();
    
      const onFinishHandler = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post('http://localhost:5000/client/clientsignup', values);
    
          if (res.data.success) {
            message.success("Register successfully!");
            navigate("/clientlogin"); // Redirect to login or home page
          } else {
            message.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          message.error("Something went wrong");
        }
      };
    
    
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/data');
          console.log(response.data);
          // Handle successful response
        } catch (error) {
          console.error('Error fetching data:', error.message);
          // Handle error response
        }
      };
      
      const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prevValues => ({
          ...prevValues,
          [name]: value
        }));
      };


  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
    <div className='p-3 rounded w-25 border loginForm'>
      <h2>SignUp Page</h2>
      <form onSubmit={onFinishHandler}>

        <div className='mb-3'>
          <label htmlFor="username"><strong>UserName:</strong></label>
          <input
            type="text"
            name="username"
            placeholder='Enter Username'
            value={values.username}
            onChange={handleChange}
            className='form-control rounded-0'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="email"><strong>Email:</strong></label>
          <input
            type="email"
            name="email"
            autoComplete='off'
            placeholder='Enter Email'
            value={values.email}
            onChange={handleChange}
            className='form-control rounded-0'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor="password"><strong>Password:</strong></label>
          <input
            type="password"
            name="password"
            placeholder='Enter Password'
            value={values.password}
            onChange={handleChange}
            className='form-control rounded-0'
            required
          />
        </div>

        <div className='mb-3'>
          <a href="/clientlogin"><strong>Already have an account! Login</strong></a>
        </div>

        <button className='btn btn-success w-100 rounded-0' type='submit'>Submit</button>
      </form>
    </div>
  </div>
);
  
}

export default ClientSignUp
