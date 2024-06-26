import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../../firebase.jsx';

const ApplyRole = () => {
  const location = useLocation();
  const selectedRole = location.state?.role || ''; // Retrieve the passed role or set to empty if not found

  const [file, setFile] = useState(null);
  const [client, setClient] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    category: selectedRole // Initialize category with selected role
  });
  const [categories, setCategories] = useState([]);
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

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  };

  const onFinishHandler = async (e) => {
    e.preventDefault();
  
    let imageURL = '';
    if (file) {
      try {
        imageURL = await handleFileUpload(file);
      } catch (error) {
        console.error('Error uploading file:', error.message);
        message.error('Failed to upload image');
        return;
      }
    }
  
    // FormData is necessary to send the image URL
    const formData = new FormData();
    for (const key in client) {
      if (key === "category" && client[key] === "") continue; // Skip adding category if it's an empty string
      formData.append(key, client[key]);
    }
    formData.append('image', imageURL);
  
    try {
      console.log('Form data before sending:', Object.fromEntries(formData.entries())); // Debugging line
      const res = await axios.post('http://localhost:5000/client/applyrole', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        navigate("/clientdashboard/role");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      message.error("Something went wrong");
    }
  };
  
  console.log(client);
  console.log(file);

  return (
    <div className='d-flex justify-content-center align-items-center mt-5'>
      <div className='p-3 rounded w-50 border'>
        <h3 className='text-center'>Apply For Role</h3>
        <form className='row g-1' onSubmit={onFinishHandler}>
          <div className='col-12'>
            <label htmlFor="inputName" className='form-label'>
              Name
            </label>
            <input
              type="text"
              className='form-control rounded-0'
              id='inputName'
              placeholder='Enter Name'
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
              onChange={(e) => setClient({ ...client, email: e.target.value })}
            />
          </div>

          <div className='col-12'>
            <label htmlFor="inputPassword" className='form-label'>
              Password
            </label>
            <input
              type="password"
              className='form-control rounded-0'
              id='inputPassword4'
              placeholder='Enter Password'
              onChange={(e) => setClient({ ...client, password: e.target.value })}
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
              value={client.category}
              onChange={(e) => setClient({ ...client, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div className='col-12 mb-3'>
            <label htmlFor="inputGroupFile01" className='form-label'>
              Select Image
            </label>
            <input
              type="file"
              className='form-control rounded-0'
              id='inputGroupFile01'
              accept='image/*'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className='col-12'>
            <button className='btn btn-primary w-100'>Add Client</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyRole;
