import React, {useState} from 'react'
import './style.css'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
const ClientLogin = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

  const onfinishHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/client/clientlogin',
        values
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/clientdashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("something went wrong");
    }
  };
 console.log(values);
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
      <h2>Login Page</h2>
      <form onSubmit={onfinishHandler}>
        <div className='mb-3'>
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" name="email" autoComplete='off' placeholder='Enter Email'
              value={values.email} onChange={handleChange} className='form-control rounded-0' required/>
        </div>

        <div className='mb-3'>
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" name="password" placeholder='Enter Password' 
             value={values.password} onChange={handleChange} className='form-control rounded-0' required/>
        </div>

        <div className='mb-3'>
        <a href="/clientsignup"><label><strong>No Account? Sign Up!</strong></label></a>
       </div>

        <button className='btn btn-success w-100 rounded-0' type='submit'>Submit</button>
      </form>
    </div>
    </div>
  )
}

export default ClientLogin
